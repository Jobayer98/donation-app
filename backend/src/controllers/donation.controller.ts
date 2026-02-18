import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import donationService from "../services/donation.service";
import paymentService from "../services/payment.service";
import { formatDonation } from "../utils/donation-format";

export const createDonationIntent = asyncHandler(
  async (req: Request, res: Response) => {
    let { campaignId, amount, isAnonymous, provider, currency } = req.body;
    const donorId = req.user?.id;

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
      currency,
      provider,
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
