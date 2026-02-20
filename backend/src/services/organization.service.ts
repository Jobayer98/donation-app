import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

class OrganizationService {
  async create(name: string, ownerId: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const exists = await prisma.organization.findUnique({ where: { slug } });
    if (exists) {
      throw new ApiError(400, "Organization with this name already exists");
    }

    const organization = await prisma.organization.create({
      data: { name, slug, ownerId },
      include: { owner: { select: { id: true, name: true, email: true } } }
    });

    // Add owner as OWNER member
    await prisma.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: ownerId,
        role: 'OWNER'
      }
    });

    return organization;
  }

  async getByUser(userId: string) {
    return prisma.organization.findMany({
      where: {
        members: { some: { userId } }
      },
      include: {
        owner: { select: { id: true, name: true } },
        _count: { select: { members: true, campaigns: true } }
      }
    });
  }

  async getById(id: string, userId: string) {
    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        members: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        },
        _count: { select: { campaigns: true } }
      }
    });

    if (!org) throw new ApiError(404, "Organization not found");

    const isMember = org.members.some(m => m.userId === userId);
    if (!isMember) throw new ApiError(403, "Access denied");

    return org;
  }

  async update(id: string, userId: string, data: { name?: string; settings?: any; logoUrl?: string; primaryColor?: string; secondaryColor?: string; customDomain?: string }) {
    await this.checkPermission(id, userId, ['OWNER', 'ADMIN']);

    return prisma.organization.update({
      where: { id },
      data
    });
  }

  async delete(id: string, userId: string) {
    const org = await prisma.organization.findUnique({ where: { id } });
    if (!org) throw new ApiError(404, "Organization not found");
    if (org.ownerId !== userId) throw new ApiError(403, "Only owner can delete organization");

    await prisma.organization.delete({ where: { id } });
  }

  async addMember(orgId: string, requesterId: string, email: string, role: 'ADMIN' | 'MEMBER') {
    await this.checkPermission(orgId, requesterId, ['OWNER', 'ADMIN']);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ApiError(404, "User not found");

    const existing = await prisma.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId: orgId, userId: user.id } }
    });

    if (existing) throw new ApiError(400, "User is already a member");

    return prisma.organizationMember.create({
      data: { organizationId: orgId, userId: user.id, role },
      include: { user: { select: { id: true, name: true, email: true } } }
    });
  }

  async updateMemberRole(orgId: string, requesterId: string, memberId: string, role: 'ADMIN' | 'MEMBER') {
    await this.checkPermission(orgId, requesterId, ['OWNER']);

    return prisma.organizationMember.update({
      where: { id: memberId },
      data: { role }
    });
  }

  async removeMember(orgId: string, requesterId: string, memberId: string) {
    await this.checkPermission(orgId, requesterId, ['OWNER', 'ADMIN']);

    const member = await prisma.organizationMember.findUnique({ where: { id: memberId } });
    if (!member) throw new ApiError(404, "Member not found");
    if (member.role === 'OWNER') throw new ApiError(400, "Cannot remove owner");

    await prisma.organizationMember.delete({ where: { id: memberId } });
  }

  private async checkPermission(orgId: string, userId: string, allowedRoles: string[]) {
    const member = await prisma.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId: orgId, userId } }
    });

    if (!member || !allowedRoles.includes(member.role)) {
      throw new ApiError(403, "Insufficient permissions");
    }
  }
}

export default new OrganizationService();
