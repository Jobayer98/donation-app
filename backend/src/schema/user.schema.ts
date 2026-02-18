import { z } from "zod";

export const UpdateUserRoleSchema = z.object({
  role: z.enum(["DONOR", "FUND_RAISER", "ADMIN"], { message: "Invalid role" }),
});

export type updateUserRoleDTO = z.infer<typeof UpdateUserRoleSchema>;
