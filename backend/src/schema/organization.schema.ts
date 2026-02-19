import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  settings: z.record(z.any(), z.any()).optional(),
});

export const addMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["ADMIN", "MEMBER"]),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "MEMBER"]),
});

export type createOrganizationDTO = z.infer<typeof createOrganizationSchema>;
export type updateOrganizationDTO = z.infer<typeof updateOrganizationSchema>;
export type addMemberDTO = z.infer<typeof addMemberSchema>;
export type updateMemberRoleDTO = z.infer<typeof updateMemberRoleSchema>;
