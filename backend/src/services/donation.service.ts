import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";

class DonationService {
  async createIntent(
    campaignId: string,
    amount: number,
    isAnonymous: boolean,
    provider: string,
    donorId?: string,
  ) {
    return prisma.donation.create({
      data: {
        amount,
        isAnonymous,
        transactionId: uuidv4(),
        provider,
        campaignId,
        donorId,
      },
    });
  }

  async findById(id: string) {
    return prisma.donation.findUnique({ where: { id } });
  }

  async findByDonor(donorId: string) {
    return prisma.donation.findMany({
      where: { donorId, status: "SUCCESS" },
      include: {
        campaign: { select: { title: true } },
      },
    });
  }

  async getDonorOverview(donorId: string) {
    const result = await prisma.donation.aggregate({
      where: { donorId, status: "SUCCESS" },
      _count: true,
      _sum: { amount: true },
    });

    return {
      totalDonation: result._count,
      totalDonationAmount: Number(result._sum.amount || 0),
    };
  }

  async updateStatus(transactionId: string, status: "SUCCESS" | "FAILED") {
    return prisma.donation.update({
      where: { transactionId },
      data: { status },
    });
  }

  async findByTransaction(transactionId: string) {
    return prisma.donation.findUnique({
      where: { transactionId },
      select: { campaignId: true, amount: true, provider: true },
    });
  }

  async incrementCampaignAmount(campaignId: string, amount: number) {
    return prisma.campaign.update({
      where: { id: campaignId },
      data: { raisedAmount: { increment: amount } },
    });
  }
}

export default new DonationService();
