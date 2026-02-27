import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  type: z.enum(["FREE", "PRO"]),
  price: z.number().min(0, "Price must be positive"),
  interval: z.enum(["MONTHLY", "YEARLY"]),
  features: z.record(z.string(), z.string()),
  limits: z.object({
    maxCampaigns: z.number(),
    maxPaymentProviders: z.number()
  }),
  isActive: z.boolean().optional()
});

export const updatePlanSchema = z.object({
  name: z.string().optional(),
  price: z.number().min(0).optional(),
  interval: z.string().optional(),
  features: z.record(z.string(), z.string()).optional(),
  limits: z.object({
    maxCampaigns: z.number(),
    maxPaymentProviders: z.number(),
  }).optional(),
  isActive: z.boolean().optional()
});

export type createPlanDTO = z.infer<typeof createPlanSchema>;
export type updatePlanDTO = z.infer<typeof updatePlanSchema>;
