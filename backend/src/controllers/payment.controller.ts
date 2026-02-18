import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import paymentService from "../services/payment.service";
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export const createPaymentSession = asyncHandler(async (req: Request, res: Response) => {
    const { donationId, amount, provider, currency } = req.body;
    const transactionId = uuidv4();
    const session = await paymentService.createPayment(donationId, amount, transactionId, currency, provider);
    res.json(session);
})

export const handlePaymentSuccess = asyncHandler(async (req: Request, res: Response) => {
    const { val_id, tran_id } = req.body;
    const data = await prisma.donation.findUnique({
        where: {
            transactionId: tran_id,
        },
    });
    const provider = data?.provider!;
    await paymentService.handleSuccess({ provider, val_id, transactionId: tran_id });
    res.redirect("http://localhost:3000/success");
})

export const handlePaymentFail = asyncHandler(async (req: Request, res: Response) => {
    const { val_id, tran_id } = req.body;
    const data = await prisma.donation.findUnique({
        where: {
            transactionId: tran_id,
        },
    });
    const provider = data?.provider!;
    await paymentService.handleFail({ provider, val_id, transactionId: tran_id });
    res.redirect("http://localhost:3000/failed");
})


export const handlePaymentCancel = asyncHandler(async (req: Request, res: Response) => {
    const { val_id, tran_id } = req.body;
    const data = await prisma.donation.findUnique({
        where: {
            transactionId: tran_id,
        },
    });
    const provider = data?.provider!;
    await paymentService.handleCancel({ provider, val_id, transactionId: tran_id });
    res.redirect("http://localhost:3000/cancel");
})
