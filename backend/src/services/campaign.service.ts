import { prisma } from "../lib/prisma";
import { createCampaignDTO } from "../schema/campaign.schema";

class CampaignService {
    async create(data: createCampaignDTO, fundraiserId: string) {
        console.log(data);
        return prisma.campaign.create({
            data: {
                ...data,
                raisedAmount: 0,
                fundraiserId
            },
            select: { id: true, status: true }
        });
    }

    async findActive(page: number, limit: number) {
        const where = { status: "ACTIVE" as const };
        const [campaigns, total] = await Promise.all([
            prisma.campaign.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where,
                select: { id: true, title: true, goalAmount: true, raisedAmount: true, category: true }
            }),
            prisma.campaign.count({ where })
        ]);

        return { campaigns, pagination: { page, limit, total } };
    }

    async findById(id: string) {
        return prisma.campaign.findUnique({
            where: { id },
            include: { donations: true }
        });
    }

    async update(id: string, data: any) {
        return prisma.campaign.update({ where: { id }, data });
    }

    async updateStatus(id: string, status: "ACTIVE" | "PAUSED") {
        return prisma.campaign.update({
            where: { id },
            data: { status },
            select: { id: true, status: true }
        });
    }

    async getFundraiserOverview(fundraiserId: string) {
        const campaigns = await prisma.campaign.findMany({
            where: { fundraiserId },
            select: {
                id: true,
                status: true,
                raisedAmount: true,
                donations: { where: { status: "SUCCESS" }, select: { id: true } }
            }
        });

        const totalCampaigns = campaigns.length;
        const activeCampaigns = campaigns.filter(c => c.status === "ACTIVE").length;
        const totalRaised = campaigns.reduce((sum, c) => sum + Number(c.raisedAmount), 0);
        const totalDonors = campaigns.filter(c => c.donations.length > 0).length;

        return { totalCampaigns, activeCampaigns, totalRaised, totalDonors };
    }

    async getFundraiserCampaigns(fundraiserId: string, status?: string) {
        return prisma.campaign.findMany({
            where: {
                fundraiserId,
                ...(status && status !== "ALL" ? { status: status as any } : {})
            },
            select: {
                id: true,
                title: true,
                status: true,
                goalAmount: true,
                raisedAmount: true,
                createdAt: true,
                _count: { select: { donations: { where: { status: "SUCCESS" } } } }
            }
        });
    }

    async getCampaignDonations(id: string, fundraiserId: string) {
        const campaign = await prisma.campaign.findUnique({
            where: { id, fundraiserId },
            select: {
                donations: {
                    where: { status: "SUCCESS" },
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                        createdAt: true,
                        donor: { select: { name: true } }
                    }
                }
            }
        });

        return campaign?.donations || [];
    }

    async getAllDonations(fundraiserId: string, page: number, limit: number) {
        const where = {
            campaign: {
                fundraiserId
            },
        };

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const [donations, total, monthStats] = await Promise.all([
            prisma.donation.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    amount: true,
                    createdAt: true,
                    donor: { select: { name: true } }
                }
            }),
            prisma.donation.count({ where }),
            prisma.donation.aggregate({
                where: {
                    ...where,
                    createdAt: { gte: startOfMonth },
                    status: "SUCCESS"
                },
                _sum: {
                    amount: true
                },
                _count: {
                    _all: true
                }
            })
        ]);

        return {
            donations,
            totalDonors: total,
            totalDonationThisMonth: monthStats._sum.amount || 0,
            totalDonationCountThisMonth: monthStats._count._all,
            pagination: { page, limit, total }
        };
    }

    async getCampaignStats(id: string, fundraiserId: string) {
        const campaign = await prisma.campaign.findUnique({
            where: { id, fundraiserId },
            select: {
                raisedAmount: true,
                _count: { select: { donations: { where: { status: "SUCCESS" } } } }
            }
        });

        return {
            totalRaised: Number(campaign?.raisedAmount || 0),
            totalDonations: campaign?._count.donations || 0
        };
    }

    async getTopCampaigns(limit: number = 4) {
        return prisma.campaign.findMany({
            where: { status: "ACTIVE" },
            take: limit,
            orderBy: { raisedAmount: "desc" },
            select: {
                id: true,
                title: true,
                raisedAmount: true,
                donations: { where: { status: "SUCCESS" } }
            }
        });
    }
}

export default new CampaignService();
