import { prisma } from "../lib/prisma";
import { campaignStatusDTO } from "../schema/campaign.schema";
import { updateUserRoleDTO } from "../schema/user.schema";

class AdminService {
    async getOverview(excludeUserId: string) {
        const [totalUsers, totalCampaigns, activeCampaigns, totalDonations] = await Promise.all([
            prisma.user.count({ where: { NOT: { id: excludeUserId } } }),
            prisma.campaign.count(),
            prisma.campaign.count({ where: { status: "ACTIVE" } }),
            prisma.donation.count({ where: { status: "SUCCESS" } })
        ]);

        return { totalUsers, totalCampaigns, activeCampaigns, totalDonations };
    }

    async getCampaigns(status?: campaignStatusDTO) {
        return prisma.campaign.findMany({
            where: status ? { status } : undefined,
            select: {
                id: true,
                title: true,
                status: true,
                raisedAmount: true,
                user: { select: { name: true } }
            }
        });
    }

    async updateCampaignStatus(id: string, status: campaignStatusDTO) {
        return prisma.campaign.update({
            where: { id },
            data: { status }
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
                campaigns: { select: { id: true, raisedAmount: true } }
            }
        });
    }

    async updateUserRole(userId: string, data: updateUserRoleDTO) {
        return prisma.user.update({
            where: { id: userId },
            data: { role: data.role },
            select: { id: true, name: true, email: true, role: true }
        });
    }
}

export default new AdminService();
