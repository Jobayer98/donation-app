import { prisma } from "../lib/prisma";

import { UpdateLandingPageContentInput } from "../schema/landingPage.schema";
import { ApiError } from "../utils/ApiError";

class LandingPageService {
  async getLandingPageContent(userId: string) {
    const organization = await prisma.organization.findFirst({
      where: { ownerId: userId },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    let content = await prisma.landingPageContent.findUnique({
      where: { organizationId: organization.id },
    });

    if (!content) {
      content = await prisma.landingPageContent.create({
        data: { organizationId: organization.id },
      });
    }

    return { ...content, organization: { slug: organization.slug } };
  }

  async updateLandingPageContent(
    userId: string,
    data: UpdateLandingPageContentInput,
  ) {
    const organization = await prisma.organization.findFirst({
      where: { ownerId: userId },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    if (data.featuredCampaignId) {
      const campaign = await prisma.campaign.findFirst({
        where: {
          id: data.featuredCampaignId,
          organizationId: organization.id,
        },
      });

      if (!campaign) {
        throw new ApiError(404, "Campaign not found");
      }
    }

    const content = await prisma.landingPageContent.upsert({
      where: { organizationId: organization.id },
      update: data,
      create: { organizationId: organization.id, ...data },
    });

    return content;
  }

  async getPublicLandingPage(slug: string) {
    const organization = await prisma.organization.findUnique({
      where: { slug, isActive: true },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true,
        primaryColor: true,
        secondaryColor: true,
      },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    const content = await prisma.landingPageContent.findUnique({
      where: { organizationId: organization.id },
    });

    const activeCampaigns = await prisma.campaign.findMany({
      where: {
        organizationId: organization.id,
        status: "ACTIVE",
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        goalAmount: true,
        raisedAmount: true,
        endDate: true,
      },
      orderBy: { createdAt: "desc" },
    });

    let featuredCampaign = null;
    if (content?.featuredCampaignId) {
      featuredCampaign = await prisma.campaign.findFirst({
        where: {
          id: content.featuredCampaignId,
          organizationId: organization.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true,
          goalAmount: true,
          raisedAmount: true,
          endDate: true,
        },
      });
    }

    return {
      organization,
      content,
      activeCampaigns,
      featuredCampaign,
    };
  }
}

export default new LandingPageService();
