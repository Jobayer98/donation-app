import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import donationService from "../services/donation.service";
import paymentService from "../services/payment.service";
import paymentProviderService from "../services/paymentProvider.service";
import { formatDonation } from "../utils/donation-format";
import { ApiError } from "../utils/ApiError";

export const createDonationIntent = asyncHandler(
  async (req: Request, res: Response) => {
    let { campaignId, amount, isAnonymous, provider } = req.body;
    const donorId = req.user?.id;

    const activeProviders = await paymentProviderService.getActiveByCampaign(campaignId);

    if (!activeProviders.some(p => p.name === provider)) {
      throw new ApiError(400, "Payment provider is not available for this campaign");
    }

    isAnonymous = isAnonymous === undefined || isAnonymous === true ? true : false;

    const donation = await donationService.createIntent(
      campaignId,
      amount,
      isAnonymous,
      provider,
      donorId,
    );
    const paymentSession = await paymentService.createPayment(
      donation.id,
      amount,
      donation.transactionId!,
      provider,
      campaignId,
    );

    res.json({
      success: true,
      data: { ...paymentSession },
    });
  },
);

export const findDonationById = asyncHandler(
  async (req: Request, res: Response) => {
    const donation = await donationService.findById(String(req.params.id));
    res.json({ success: true, data: donation });
  },
);

export const findMyDonations = asyncHandler(
  async (req: Request, res: Response) => {
    const donations = await donationService.findByDonor(req.user!.id);
    res.json({ success: true, data: formatDonation(donations) });
  },
);

export const getUserDonationOverview = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await donationService.getDonorOverview(req.user!.id);
    res.json({ success: true, data });
  },
);
