import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email().optional(),
  phone: z.string().optional(),
  website: z.url().optional(),
  description: z.string().max(500).optional(),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  website: z.url().optional(),
  description: z.string().max(500).optional(),
  logoUrl: z.url().optional(),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  customDomain: z.string().optional(),
  settings: z.record(z.any(), z.any()).optional(),
});

export type createOrganizationDTO = z.infer<typeof createOrganizationSchema>;
export type updateOrganizationDTO = z.infer<typeof updateOrganizationSchema>;
