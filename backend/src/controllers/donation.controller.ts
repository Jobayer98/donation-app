import { prisma } from "../lib/prisma";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import paymentService from "../services/payment.service";
import { v4 as uuidv4 } from "uuid";
import { formatDonation } from "../utils/donation-format";

export const createDonationIntent = asyncHandler(async (req: Request, res: Response) => {
    const donorId = req.user?.id;
    const { campaignId, amount, isAnonymous, provider, currency } = req.body;
    const transactionId = uuidv4();

    // create donation intent
    const data = await prisma.donation.create({
        data: {
            amount,
            isAnonymous,
            transactionId,
            provider,
            campaign: {
                connect: { id: campaignId },
            },
            donor: donorId ? { connect: { id: donorId } } : undefined,
        },
    });

    // create payment session
    const paymentSession = await paymentService.createPayment(data.id, amount, transactionId, currency, provider);

    res.json({
        success: true,
        data: {
            paymentSession,
            donation: data,
        },
    });
});

// export const findAllDonations = asyncHandler(async (req: Request, res: Response) => {
//     const donations = await prisma.donation.findMany();
//     res.json({
//         success: true,
//         data: donations,
//     });
// });

export const findDonationById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const donation = await prisma.donation.findUnique({
        where: {
            id: String(id),
        },
    });
    res.json({
        success: true,
        data: donation,
    });
});

// get donation history
export const findMyDonations = asyncHandler(async (req: Request, res: Response) => {
    const donorId = req.user?.id;
    let donations = await prisma.donation.findMany({
        where: {
            donorId: String(donorId),
            status: "SUCCESS",

        },
        include: {
            campaign: {
                select: {
                    title: true,

                }
            }
        }
    });

    res.json({
        success: true,
        data: formatDonation(donations),
    });
});

// get user donation overview (total donation, total donation count, total donation amount)
export const getUserDonationOverview = asyncHandler(async (req: Request, res: Response) => {
    const donorId = req.user?.id;
    const donations = await prisma.donation.findMany({
        where: {
            donorId: String(donorId),
            status: "SUCCESS",
        },
        select: {
            amount: true,

        }
    });
    res.json({
        success: true,
        data: {
            totalDonation: donations.length,
            totalDonationAmount: donations.reduce((acc, donation) => acc + Number(donation.amount), 0),
        },
    });
});