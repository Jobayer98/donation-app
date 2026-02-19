import { z } from "zod";

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required")
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address")
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export type verifyEmailDTO = z.infer<typeof verifyEmailSchema>;
export type forgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordDTO = z.infer<typeof resetPasswordSchema>;
