import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email address"),
  role: z.enum(["DONOR", "FUND_RAISER", "ADMIN"]).default("FUND_RAISER"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type registerDTO = z.infer<typeof RegisterSchema>;
export type loginDTO = z.infer<typeof LoginSchema>;
