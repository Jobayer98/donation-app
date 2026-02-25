import { z } from "zod";

export const CampaignSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.optional(z.url()),
  goalAmount: z.number().positive("Goal amount must be positive"),
  category: z.string().min(1, "Category is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  type: z.enum(["donation", "crowdfunding"], {
    message: "Type must be 'donation' or 'crowdfunding'",
  }),
});

export type CampaignFormData = z.infer<typeof CampaignSchema>;
