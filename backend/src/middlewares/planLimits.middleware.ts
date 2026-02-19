import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import subscriptionService from "../services/subscription.service";

export const checkCampaignLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const canCreate = await subscriptionService.checkLimit(req.user.id, 'campaigns');
  
  if (!canCreate) {
    throw new ApiError(403, "Campaign limit reached. Upgrade your plan to create more campaigns.");
  }

  next();
};

export const checkPaymentProviderLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const canCreate = await subscriptionService.checkLimit(req.user.id, 'paymentProviders');
  
  if (!canCreate) {
    throw new ApiError(403, "Payment provider limit reached. Upgrade your plan to add more providers.");
  }

  next();
};
