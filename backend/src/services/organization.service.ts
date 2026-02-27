import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import {
  createOrganizationDTO,
  updateNotificationPreferencesDTO,
  updateOrganizationDTO,
} from "../schema/organization.schema";

class OrganizationService {
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  private async verifyOwnership(orgId: string, userId: string) {
    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
      select: { ownerId: true },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    if (organization.ownerId !== userId) {
      throw new ApiError(403, "Access denied");
    }
  }

  async createOrganization(userId: string, data: createOrganizationDTO) {
    const slug = this.generateSlug(data.name);

    const existingOrg = await prisma.organization.findUnique({
      where: { slug },
    });
    if (existingOrg) {
      throw new ApiError(400, "Organization with this name already exists");
    }

    const freePlan = await prisma.plan.findUnique({ where: { type: "FREE" } });
    if (!freePlan) {
      throw new ApiError(500, "Free plan not found");
    }

    const now = new Date();
    const endDate = new Date(now);
    endDate.setFullYear(endDate.getFullYear() + 100);

    return prisma.organization.create({
      data: {
        ...data,
        slug,
        ownerId: userId,
        subscription: {
          create: {
            planId: freePlan.id,
            status: "ACTIVE",
            currentPeriodStart: now,
            currentPeriodEnd: endDate,
          },
        },
      },
      include: {
        subscription: {
          include: { plan: true },
        },
      },
    });
  }

  async getUserOrganization(userId: string) {
    return prisma.organization.findFirst({
      where: {
        ownerId: userId,
      },
    });
  }

  async getOrganizationById(orgId: string, userId: string) {
    await this.verifyOwnership(orgId, userId);

    return prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        subscription: {
          include: { plan: true },
        },
        _count: {
          select: { campaigns: true },
        },
      },
    });
  }

  async updateOrganization(
    orgId: string,
    userId: string,
    data: updateOrganizationDTO,
  ) {
    await this.verifyOwnership(orgId, userId);

    return prisma.organization.update({
      where: { id: orgId },
      data,
    });
  }

  async deleteOrganization(orgId: string, userId: string) {
    await this.verifyOwnership(orgId, userId);

    await prisma.organization.delete({ where: { id: orgId } });
  }

  async toggleOrganizationStatus(orgId: string, userId: string) {
    await this.verifyOwnership(orgId, userId);

    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
    });

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    return prisma.organization.update({
      where: { id: orgId },
      data: { isActive: !organization.isActive },
    });
  }

  async getNotificationPreferences(orgId: string, userId: string) {
    await this.verifyOwnership(orgId, userId);

    return prisma.organization.findUnique({
      where: { id: orgId },
      select: {
        donationAlert: true,
        donationAlertEmail: true,
        weeklySummary: true,
        monthlySummary: true,
      },
    });
  }

  async updateNotificationPreferences(
    orgId: string,
    userId: string,
    data: updateNotificationPreferencesDTO,
  ) {
    await this.verifyOwnership(orgId, userId);

    return prisma.organization.update({
      where: { id: orgId },
      data,
    });
  }
}

export default new OrganizationService();
