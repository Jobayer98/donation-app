import { z } from "zod";

export const DonationSchema = z.object({
    campaignId: z.string().min(1, "Campaign ID is required"),
    amount: z.number().positive("Amount must be positive").min(1, "Minimum donation is 1").max(1000000, "Maximum donation is 1,000,000"),
    isAnonymous: z.boolean().default(false),
    provider: z.enum(["sslcommerz", "stripe", "bkash"], { message: "Invalid payment provider" })
});

export type DonationDTO = z.infer<typeof DonationSchema>;
