import { z } from "zod";
import { is } from "zod/v4/locales";

export const CreatePaymentProviderSchema = z.object({
  name: z.enum(["sslcommerz", "stripe", "bkash"]),
  isActive: z.boolean().default(true),
  config: z.object({
    apiKey: z.string().optional(),
    secretKey: z.string().optional(),
  }),
});

export type CreatePaymentProviderDTO = z.infer<
  typeof CreatePaymentProviderSchema
>;
