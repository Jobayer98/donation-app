import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' });

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
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, "User not found");

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new ApiError(404, "Plan not found");

    // Check if already subscribed
    const existing = await prisma.subscription.findUnique({
      where: { userId },
    });
    if (existing) {
      throw new ApiError(
        400,
        "Already subscribed. Cancel current subscription first.",
      );
    }

    // Free plan - no Stripe needed
    if (plan.type === "FREE") {
      return this.createFreeSubscription(userId, planId);
    }

    // Paid plan - use Stripe
    // return this.createStripeSubscription(userId, user.email, planId, plan);
  }

  private async createFreeSubscription(userId: string, planId: string) {
    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(endDate.getFullYear() + 100); // Free forever

    return prisma.subscription.create({
      data: {
        userId,
        planId,
        status: "ACTIVE",
        currentPeriodStart: now,
        currentPeriodEnd: endDate,
      },
      include: { plan: true },
    });
  }

  // private async createStripeSubscription(userId: string, email: string, planId: string, plan: any) {
  //   // Create or get Stripe customer
  //   const customer = await stripe.customers.create({
  //     email,
  //     metadata: { userId }
  //   });

  //   // Create Stripe subscription
  //   const stripeSubscription = await stripe.subscriptions.create({
  //     customer: customer.id,
  //     items: [{ price_data: {
  //       currency: 'usd',
  //       product_data: { name: plan.name },
  //       recurring: { interval: plan.interval },
  //       unit_amount: Math.round(Number(plan.price) * 100),
  //     }}],
  //     metadata: { userId, planId }
  //   });

  //   // Save to database
  //   return prisma.subscription.create({
  //     data: {
  //       userId,
  //       planId,
  //       status: 'ACTIVE',
  //       stripeSubscriptionId: stripeSubscription.id,
  //       stripeCustomerId: customer.id,
  //       currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
  //       currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
  //     },
  //     include: { plan: true }
  //   });
  // }

  // async cancelSubscription(userId: string) {
  //   const subscription = await prisma.subscription.findUnique({ where: { userId } });
  //   if (!subscription) throw new ApiError(404, "No active subscription");

  //   // Cancel Stripe subscription if exists
  //   if (subscription.stripeSubscriptionId) {
  //     await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
  //       cancel_at_period_end: true
  //     });
  //   }

  //   return prisma.subscription.update({
  //     where: { userId },
  //     data: {
  //       cancelAtPeriodEnd: true,
  //       status: 'CANCELED'
  //     }
  //   });
  // }

  async checkLimit(
    userId: string,
    limitType: "campaigns" | "paymentProviders",
  ): Promise<boolean> {
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
        ? await prisma.campaign.count({ where: { fundraiserId: userId } })
        : await prisma.paymentProvider.count({
            where: { fundRaiserId: userId },
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
