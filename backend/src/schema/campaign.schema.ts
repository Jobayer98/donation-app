import { z } from "zod";

export const CreateCampaignSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  type: z.string(),
  goalAmount: z.number().positive(),
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime(),
  category: z.string(),
});

export const CampaignIdParamSchema = z.object({
  id: z.uuid({ version: "v7" }),
});

export type createCampaignDTO = z.infer<typeof CreateCampaignSchema>;
export type campaignIdDTO = z.infer<typeof CampaignIdParamSchema>;
