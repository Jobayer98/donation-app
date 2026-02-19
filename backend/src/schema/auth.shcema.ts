import { z } from "zod";

export const RegisterDonorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export const RegisterFundraiserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type registerDonorDTO = z.infer<typeof RegisterDonorSchema>;
export type registerFundraiserDTO = z.infer<typeof RegisterFundraiserSchema>;
export type loginDTO = z.infer<typeof LoginSchema>;
