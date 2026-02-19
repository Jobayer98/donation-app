import { z } from "zod";

export const subscribeSchema = z.object({
  planId: z.string().min(1, "Plan ID is required")
});

export type subscribeDTO = z.infer<typeof subscribeSchema>;
