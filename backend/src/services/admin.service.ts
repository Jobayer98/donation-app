import { prisma } from "../lib/prisma";
import { campaignStatusDTO } from "../schema/campaign.schema";
import { updateUserRoleDTO } from "../schema/user.schema";

class AdminService {
  async getOverview(excludeUserId: string) {
    const [totalUsers, totalOrganizations, totalCampaigns, activeCampaigns, totalDonations, totalRevenue] = await Promise.all([
      prisma.user.count({ where: { NOT: { id: excludeUserId } } }),
      prisma.organization.count(),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { status: "ACTIVE" } }),
      prisma.donation.count({ where: { status: "SUCCESS" } }),
      prisma.donation.aggregate({
        where: { status: "SUCCESS" },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalUsers,
      totalOrganizations,
      totalCampaigns,
      activeCampaigns,
      totalDonations,
      totalRevenue: Number(totalRevenue._sum.amount || 0),
    };
  }

  async getCampaigns(status?: campaignStatusDTO) {
    return prisma.campaign.findMany({
      where: status ? { status } : undefined,
      select: {
        id: true,
        title: true,
        status: true,
        raisedAmount: true,
        goalAmount: true,
        createdAt: true,
        organization: {
          select: {
            name: true,
            owner: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateCampaignStatus(id: string, status: campaignStatusDTO) {
    return prisma.campaign.update({
      where: { id },
      data: { status },
    });
  }

  async getUsers(excludeUserId: string) {
    return prisma.user.findMany({
      where: { NOT: { id: excludeUserId } },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        organizations: {
          select: {
            id: true,
            name: true,
            _count: { select: { campaigns: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateUserRole(userId: string, data: updateUserRoleDTO) {
    return prisma.user.update({
      where: { id: userId },
      data: { role: data.role },
      select: { id: true, name: true, email: true, role: true },
    });
  }

  async getOrganizations() {
    return prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        createdAt: true,
        owner: { select: { name: true, email: true } },
        subscription: {
          select: {
            status: true,
            plan: { select: { name: true, type: true } },
          },
        },
        _count: { select: { campaigns: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getRecentDonations(limit: number = 10) {
    return prisma.donation.findMany({
      where: { status: "SUCCESS" },
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        donor: { select: { name: true, email: true } },
        campaign: {
          select: {
            title: true,
            organization: { select: { name: true } },
          },
        },
      },
    });
  }
}

export default new AdminService();
