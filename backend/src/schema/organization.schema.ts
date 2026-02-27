import { z } from "zod";

export const createOrganizationSchema = z.object({

  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email().optional(),
  phone: z.string().optional(),
  customDomain: z.string().optional(),
  logoUrl: z.string().optional(),

  description: z.string().max(500).optional(),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  logoUrl: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  description: z.string().max(500).optional(),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  customDomain: z.string().optional(),
  isActive: z.preprocess((val) => {
    if (typeof val === "string") {
      if (val === "true") return true;
      if (val === "false") return false;
    }
    return val;
  }, z.boolean().optional()),
});

export const updateNotificationPreferencesSchema = z.object({
  donationAlert: z.boolean().optional(),
  donationAlertEmail: z.boolean().optional(),
  weeklySummary: z.boolean().optional(),
  monthlySummary: z.boolean().optional(),
});

export type createOrganizationDTO = z.infer<typeof createOrganizationSchema>;
export type updateOrganizationDTO = z.infer<typeof updateOrganizationSchema>;
export type updateNotificationPreferencesDTO = z.infer<typeof updateNotificationPreferencesSchema>;
