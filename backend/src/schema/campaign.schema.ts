import { z } from "zod";

export const CreateCampaignSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters").max(200),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(5000),
    type: z.enum(["donation", "crowdfunding"], {
      message: "Type must be 'donation' or 'crowdfunding'",
    }),
    goalAmount: z.number().positive("Goal amount must be positive"),
    startDate: z.iso.datetime("Invalid start date format"),
    endDate: z.iso.datetime("Invalid end date format"),
    category: z.string().min(2, "Category is required").max(100),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const UpdateCampaignSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  description: z.string().min(10).max(5000).optional(),
  goalAmount: z.number().positive().optional(),
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
  category: z.string().min(2).max(100).optional(),
});

export const CampaignStatusSchema = z.enum([
  "DRAFT",
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
]);

export const UpdateCampaignStatusSchema = z.object({
  status: CampaignStatusSchema,
});

export type createCampaignDTO = z.infer<typeof CreateCampaignSchema>;
export type updateCampaignDTO = z.infer<typeof UpdateCampaignSchema>;
export type campaignStatusDTO = z.infer<typeof CampaignStatusSchema>;
