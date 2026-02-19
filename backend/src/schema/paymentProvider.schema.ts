import { z } from "zod";

export const CreatePaymentProviderSchema = z.object({
  name: z.enum(["sslcommerz", "stripe", "bkash", "paypal", "razorpay"]),
  currency: z.string().default("BDT"),
  config: z.object({
    api_key: z.string().min(1, "API key is required"),
    secret_key: z.string().min(1, "Secret key is required"),
    is_live: z.boolean().optional().default(false),
  }),
});

export const UpdatePaymentProviderSchema = z.object({
  name: z.enum(["sslcommerz", "stripe", "bkash", "paypal", "razorpay"]).optional(),
  currency: z.string().optional(),
  config: z.object({
    api_key: z.string().min(1, "API key is required"),
    secret_key: z.string().min(1, "Secret key is required"),
    is_live: z.boolean().optional(),
  }).optional(),
});

export type CreatePaymentProviderDTO = z.infer<typeof CreatePaymentProviderSchema>;
export type UpdatePaymentProviderDTO = z.infer<typeof UpdatePaymentProviderSchema>;
