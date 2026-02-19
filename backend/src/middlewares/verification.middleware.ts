import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { prisma } from "../lib/prisma";

export const requireVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { verificationStatus: true }
  });

  if (!user?.verificationStatus) {
    throw new ApiError(403, "Please verify your email to perform this action");
  }

  next();
};
