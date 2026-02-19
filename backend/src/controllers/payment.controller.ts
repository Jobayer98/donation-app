import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import paymentService from "../services/payment.service";
import donationService from "../services/donation.service";

export const createPaymentSession = asyncHandler(async (req: Request, res: Response) => {
    const { donationId, amount, provider, currency, transactionId, campaignId } = req.body;
    const session = await paymentService.createPayment(donationId, amount, transactionId, currency, provider, campaignId);
    res.json(session);
});

export const handlePaymentSuccess = asyncHandler(async (req: Request, res: Response) => {
    const { val_id, tran_id } = req.body;
    const donation = await donationService.findByTransaction(tran_id);

    await paymentService.handlePaymentCallback({ provider: donation!.provider, val_id, transactionId: tran_id });
    res.redirect("http://localhost:3000/success");
});

export const handlePaymentFail = asyncHandler(async (req: Request, res: Response) => {
    const { val_id, tran_id } = req.body;
    const donation = await donationService.findByTransaction(tran_id);

    await paymentService.handlePaymentCallback({ provider: donation!.provider, val_id, transactionId: tran_id });
    res.redirect("http://localhost:3000/failed");
});

export const handlePaymentCancel = asyncHandler(async (req: Request, res: Response) => {
    const { val_id, tran_id } = req.body;
    const donation = await donationService.findByTransaction(tran_id);

    await paymentService.handlePaymentCallback({ provider: donation!.provider, val_id, transactionId: tran_id });
    res.redirect("http://localhost:3000/cancel");
});
