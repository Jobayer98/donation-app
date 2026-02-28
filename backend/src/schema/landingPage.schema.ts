import { z } from "zod";

export const updateLandingPageContentSchema = z.object({
  heroTitle: z.string().max(200).optional(),
  heroSubtitle: z.string().max(500).optional(),
  heroImageUrl: z.string().url().optional(),
  featuredCampaignId: z.string().optional().nullable(),
  showActiveCampaigns: z.boolean().optional(),
  activeCampaignsTitle: z.string().max(100).optional(),
  footerText: z.string().max(1000).optional(),
  footerLinks: z.array(z.object({
    label: z.string(),
    url: z.string().url()
  })).optional(),
});

export type UpdateLandingPageContentInput = z.infer<typeof updateLandingPageContentSchema>;
