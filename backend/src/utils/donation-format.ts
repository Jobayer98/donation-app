// format donation history data
import { Decimal } from "@prisma/client/runtime/client";

interface Donation {
  id: string;
  amount: Decimal;
  status: string;
  isAnonymous: boolean;
  provider: string;
  createdAt: Date;
  campaign: {
    title: string;
  };
}
export const formatDonation = (data: Donation[]) => {
  return data.map((donation: Donation) => ({
    id: donation.id,
    amount: Number(donation.amount),
    status: donation.status,
    isAnonymous: donation.isAnonymous,
    provider: donation.provider,
    createdAt: donation.createdAt,
    campaignName: donation.campaign.title,
  }));
};
