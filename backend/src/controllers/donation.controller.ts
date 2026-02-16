import { prisma } from "../lib/prisma";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

export const createDonationIntent = asyncHandler(async (req: Request, res: Response) => {
    const donorId = req.user?.id;
    const { campaignId, amount, isAnonymous } = req.body;

    const data = await prisma.donation.create({
        data: {
            amount,
            isAnonymous,
            campaign: {
                connect: { id: campaignId },
            },
            donor: donorId ? { connect: { id: donorId } } : undefined,
        },
    });

    res.json({
        success: true,
        data,
    });
});


export const updateDonationStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id, status, transactionId } = req.body;
    let data = await prisma.donation.update({
        where: {
            id,
        },
        data: {
            status,
            transactionId,
        },
    });
    res.json({
        success: true,
        message: "Donation status updated successfully",
        data,
    });
});