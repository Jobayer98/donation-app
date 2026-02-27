import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import Stripe from "stripe";
import { stripeConfig, appConfig } from "../config/config";

const stripe = new Stripe(stripeConfig.secretKey!);

class SubscriptionService {
  async getPlans() {
    return prisma.plan.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        type: true,
        price: true,
        interval: true,
        features: true,
        limits: true,
      },
      orderBy: { price: "asc" },
    });
  }

  async getCurrentSubscription(userId: string) {
    // Get user's organization
    const organization = await prisma.organization.findFirst({
      where: { ownerId: userId },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found for this user");
    }

    const subscription = await prisma.subscription.findUnique({
      where: { organizationId: organization.id },
      include: {
        plan: {
          select: {
            id: true,
            name: true,
            type: true,
            price: true,
            features: true,
            limits: true,
          },
        },
      },
    });

    if (!subscription) {
      // Return free plan if no subscription
      const freePlan = await prisma.plan.findUnique({
        where: { type: "FREE" },
      });
      return {
        plan: freePlan,
        status: "ACTIVE",
        isFree: true,
      };
    }

    return subscription;
  }

  async subscribe(userId: string, planId: string) {
    // Get user's organization
    const organization = await prisma.organization.findFirst({
      where: { ownerId: userId },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found for this user");
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new ApiError(404, "Plan not found");

    // Check if already has an ACTIVE subscription
    const existing = await prisma.subscription.findUnique({
      where: { organizationId: organization.id },
    });

    if (existing && existing.status === "ACTIVE") {
      throw new ApiError(
        400,
        "Already has an active subscription. Cancel it first to change plans.",
      );
    }

    // Free plan - no Stripe needed
    if (plan.type === "FREE") {
      return this.createFreeSubscription(organization.id, planId);
    }

    // Paid plan - create Stripe Checkout Session
    return this.createStripeCheckoutSession(organization.id, organization.email || "", planId, plan);
  }

  private async createFreeSubscription(organizationId: string, planId: string) {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(endDate.getFullYear() + 100); // Free forever

    return prisma.subscription.upsert({
      where: { organizationId },
      update: {
        planId,
        status: "ACTIVE",
        currentPeriodStart: now,
        currentPeriodEnd: endDate,
        stripeSubscriptionId: null,
        cancelAtPeriodEnd: false
      },
      create: {
        organizationId,
        planId,
        status: "ACTIVE",
        currentPeriodStart: now,
        currentPeriodEnd: endDate,
      },
      include: { plan: true },
    });
  }

  private async createStripeCheckoutSession(organizationId: string, email: string, planId: string, plan: any) {
    // Check for existing customer ID from any previous subscription
    const existingSub = await prisma.subscription.findUnique({
      where: { organizationId },
      select: { stripeCustomerId: true }
    });

    let customerId = existingSub?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { organizationId }
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
              description: `Subscription to ${plan.name} plan`,
            },
            unit_amount: Math.round(Number(plan.price) * 100),
            recurring: {
              interval: plan.interval as Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring.Interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: { organizationId, planId },
      success_url: `${appConfig.base_url}/api/subscriptions/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appConfig.base_url}/api/subscriptions/cancel`,
    });

    return { url: session.url };
  }

  async finalizeSubscription(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    const organizationId = session.metadata?.organizationId;
    const planId = session.metadata?.planId;

    if (!organizationId || !planId) {
      throw new ApiError(400, "Missing metadata in Stripe session");
    }

    const stripeSubscription = session.subscription as any;

    return prisma.subscription.upsert({
      where: { organizationId },
      update: {
        planId,
        status: "ACTIVE",
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId: session.customer as string,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        cancelAtPeriodEnd: false
      },
      create: {
        organizationId,
        planId,
        status: "ACTIVE",
        stripeSubscriptionId: stripeSubscription.id,
        stripeCustomerId: session.customer as string,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      },
      include: { plan: true }
    });
  }

  async cancelSubscription(userId: string) {
    // Get user's organization
    const organization = await prisma.organization.findFirst({
      where: { ownerId: userId },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found for this user");
    }

    const subscription = await prisma.subscription.findUnique({
      where: { organizationId: organization.id },
      include: { plan: true }
    });

    if (!subscription || subscription.status !== "ACTIVE") {
      throw new ApiError(400, "No active subscription found");
    }

    // Cancel Stripe subscription if it's a paid plan
    if (subscription.stripeSubscriptionId) {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
    }

    return prisma.subscription.update({
      where: { organizationId: organization.id },
      data: {
        cancelAtPeriodEnd: true,
        status: 'CANCELED'
      }
    });
  }

  async checkLimit(
    userId: string,
    limitType: "campaigns" | "paymentProviders",
  ): Promise<boolean> {
    // Get user's organization
    const organization = await prisma.organization.findFirst({
      where: { ownerId: userId },
    });

    if (!organization) return false;

    const subscription = await this.getCurrentSubscription(userId);
    const limits = subscription.plan?.limits as any;

    if (!limits) return true;

    const maxLimit =
      limitType === "campaigns"
        ? limits.maxCampaigns
        : limits.maxPaymentProviders;

    // -1 means unlimited
    if (maxLimit === -1) return true;

    // Count current usage
    const count =
      limitType === "campaigns"
        ? await prisma.campaign.count({ where: { organizationId: organization.id } })
        : await prisma.paymentProvider.count({
          where: { organizationId: organization.id },
        });

    return count < maxLimit;
  }

  async getTransactionFee(userId: string): Promise<number> {
    const subscription = await this.getCurrentSubscription(userId);
    const limits = subscription.plan?.limits as any;
    return limits?.transactionFee || 5;
  }
}

export default new SubscriptionService();
