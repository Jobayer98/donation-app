import { z } from "zod";

const donationSchema = z.object({
    campaignId: z.string(),
    donorId: z.string().optional(),
    amount: z.number(),
    status: z.enum(["PENDING", "SUCCESS", "FAILED"]).default("PENDING"),
    isAnonymous: z.boolean().default(false),
    transactionId: z.string().optional(),
    createdAt: z.date().optional(),
});

const updateDonationSchema = z.object({
    id: z.string(),
    status: z.enum(["PENDING", "SUCCESS", "FAILED"]).default("PENDING"),
    transactionId: z.string().optional(),
    createdAt: z.date().optional(),
});

export type DonationDTO = z.infer<typeof donationSchema>;
export type UpdateDonationDTO = z.infer<typeof updateDonationSchema>;
