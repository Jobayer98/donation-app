import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  role: z.optional(
    z.enum(["DONOR", "FUND_RAISER", "ADMIN"]).default("FUND_RAISER"),
  ),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type registerDTO = z.infer<typeof RegisterSchema>;
export type loginDTO = z.infer<typeof LoginSchema>;
