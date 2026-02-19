import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      organizationId?: string;
    }
  }
}

export const requireOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orgId = req.headers['x-organization-id'] as string;

  if (!orgId) {
    throw new ApiError(400, "Organization ID required");
  }

  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  // Verify user is member of organization
  const member = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId: orgId,
        userId: req.user.id
      }
    }
  });

  if (!member) {
    throw new ApiError(403, "Not a member of this organization");
  }

  req.organizationId = orgId;
  next();
};
