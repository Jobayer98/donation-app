import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import paymentService from "../services/payment.service";

export const createPaymentSession = asyncHandler(async (req: Request, res: Response) => {
    const { provider, amount, currency, customer } = req.body;
    const session = await paymentService.createPayment({ provider, amount, currency, customer });
    res.json(session);
})

export const handlePaymentSuccess = asyncHandler(async (req: Request, res: Response) => {
    const { provider, val_id } = req.body;
    console.log(provider, val_id);
    await paymentService.handleSuccess({ provider, val_id });
    res.redirect("http://localhost:3000/success");
})

export const handlePaymentFail = asyncHandler(async (req: Request, res: Response) => {
    const { provider, val_id } = req.body;
    await paymentService.handleFail({ provider, val_id });
    res.redirect("http://localhost:3000/failed");
})


export const handlePaymentCancel = asyncHandler(async (req: Request, res: Response) => {
    const { provider, val_id } = req.body;
    const result = await paymentService.handleCancel({ provider, val_id });
    res.redirect("http://localhost:3000/cancel");
})
