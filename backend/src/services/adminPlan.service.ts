import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

class AdminPlanService {
  async getAllPlans() {
    return prisma.plan.findMany({
      include: {
        _count: {
          select: { subscriptions: true }
        }
      },
      orderBy: { price: 'asc' }
    });
  }

  async createPlan(data: any) {
    const exists = await prisma.plan.findUnique({
      where: { type: data.type }
    });

    if (exists) {
      throw new ApiError(400, "Plan with this type already exists");
    }

    return prisma.plan.create({
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        interval: data.interval || 'month',
        features: data.features,
        limits: data.limits,
        isActive: data.isActive ?? true
      }
    });
  }

  async updatePlan(planId: string, data: any) {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    return prisma.plan.update({
      where: { id: planId },
      data: {
        name: data.name,
        price: data.price,
        interval: data.interval,
        features: data.features,
        limits: data.limits,
        isActive: data.isActive
      }
    });
  }

  async togglePlanStatus(planId: string) {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    return prisma.plan.update({
      where: { id: planId },
      data: { isActive: !plan.isActive }
    });
  }

  async getAllSubscriptions(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, email: true }
          },
          plan: {
            select: { id: true, name: true, type: true, price: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.subscription.count()
    ]);

    return {
      subscriptions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getSubscriptionStats() {
    const [total, active, canceled, byPlan] = await Promise.all([
      prisma.subscription.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.subscription.count({ where: { status: 'CANCELED' } }),
      prisma.subscription.groupBy({
        by: ['planId'],
        _count: true
      })
    ]);

    const planStats = await Promise.all(
      byPlan.map(async (item) => {
        const plan = await prisma.plan.findUnique({
          where: { id: item.planId },
          select: { name: true, type: true }
        });
        return {
          plan: plan?.name,
          type: plan?.type,
          count: item._count
        };
      })
    );

    return {
      total,
      active,
      canceled,
      byPlan: planStats
    };
  }

  async cancelUserSubscription(userId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    });

    if (!subscription) {
      throw new ApiError(404, "Subscription not found");
    }

    return prisma.subscription.update({
      where: { userId },
      data: {
        status: 'CANCELED',
        cancelAtPeriodEnd: true
      }
    });
  }
}

export default new AdminPlanService();
