import { z } from "zod";

export const DonationSchema = z.object({
    campaignId: z.string(),
    donorId: z.string().optional(),
    amount: z.number(),
    status: z.enum(["PENDING", "SUCCESS", "FAILED"]).default("PENDING"),
    isAnonymous: z.boolean().default(false),
    transactionId: z.string().optional(),
    provider: z.string(),
    currency: z.string(),
});

export const UpdateDonationSchema = z.object({
    id: z.string(),
    status: z.enum(["PENDING", "SUCCESS", "FAILED"]).default("PENDING"),
    transactionId: z.string().optional(),
});

export type DonationDTO = z.infer<typeof DonationSchema>;
export type UpdateDonationDTO = z.infer<typeof UpdateDonationSchema>;
