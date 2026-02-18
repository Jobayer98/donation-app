import { z } from "zod";

export const PaymentSchema = z.object({
    donationId: z.string().min(1, "Donation ID is required"),
    amount: z.number().positive("Amount must be positive"),
    provider: z.enum(["sslcommerz", "stripe", "bkash"], { message: "Invalid payment provider" }),
    currency: z.string().length(3, "Currency must be 3 characters").toUpperCase(),
    transactionId: z.string().min(1, "Transaction ID is required"),
});

export const PaymentCallbackSchema = z.object({
    val_id: z.string().min(1, "Validation ID is required"),
    tran_id: z.string().min(1, "Transaction ID is required"),
});

export type PaymentDTO = z.infer<typeof PaymentSchema>;
export type PaymentCallbackDTO = z.infer<typeof PaymentCallbackSchema>;

export type PaymentSuccessDTO = {
    provider: string;
    val_id: string;
    transactionId: string;
};