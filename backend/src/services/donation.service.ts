import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../utils/ApiError";
import { sendDonationReceipt, sendDonationNotification } from "../utils/email";
import notificationService from "./notification.service";

class DonationService {
  async createIntent(
    campaignId: string,
    amount: number,
    isAnonymous: boolean,
    provider: string,
    donorId?: string,
  ) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });
    if (!campaign) throw new ApiError(404, "Campaign not found");
    if (campaign.status !== "ACTIVE")
      throw new ApiError(400, "Campaign is not active");
    if (new Date() > campaign.endDate)
      throw new ApiError(400, "Campaign has ended");

    const remaining =
      Number(campaign.goalAmount) - Number(campaign.raisedAmount);
    if (remaining <= 0)
      throw new ApiError(400, "Campaign goal already reached");
    if (amount > remaining)
      throw new ApiError(
        400,
        `Donation exceeds remaining goal. Maximum: ${remaining}`,
      );

    if (donorId) {
      const recentDonation = await prisma.donation.findFirst({
        where: {
          donorId,
          campaignId,
          createdAt: { gte: new Date(Date.now() - 60000) },
        },
      });
      if (recentDonation)
        throw new ApiError(429, "Please wait before making another donation");
    }

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
      select: { fundraiserId: true },
    });
  }

  async sendDonationEmails(transactionId: string) {
    const donation = await prisma.donation.findUnique({
      where: { transactionId },
      include: {
        donor: { select: { name: true, email: true } },
        campaign: {
          select: {
            title: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });

    if (!donation || donation.status !== "SUCCESS") return;

    // Create in-app notification for fundraiser
    await notificationService.create(
      donation.campaign.user.id,
      "DONATION",
      "New Donation Received",
      `You received $${Number(donation.amount)} from ${donation.donor?.name || "Anonymous"} for ${donation.campaign.title}`,
      {
        donationId: donation.id,
        campaignId: donation.campaignId,
        amount: Number(donation.amount),
        donorName: donation.donor?.name || "Anonymous",
      },
    );

    const emailPromises = [];

    // Send receipt to donor
    if (donation.donor && !donation.isAnonymous) {
      emailPromises.push(
        sendDonationReceipt(
          donation.donor.email,
          donation.donor.name,
          Number(donation.amount),
          "BDT", // Assuming BDT as per previous context or fallback to config if available
          donation.campaign.title,
          transactionId,
        ),
      );
    }

    // Send notification to fundraiser
    emailPromises.push(
      sendDonationNotification(
        donation.campaign.user.email,
        donation.campaign.user.name,
        donation.donor?.name || "Anonymous",
        Number(donation.amount),
        "BDT",
        donation.campaign.title,
        donation.isAnonymous,
      ),
    );

    await Promise.all(emailPromises);
  }
}

export default new DonationService();
