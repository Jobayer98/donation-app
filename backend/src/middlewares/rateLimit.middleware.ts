import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const donationRateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const limit = 5;
  const windowMs = 60000;

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= limit) {
    throw new ApiError(429, "Too many donation attempts. Please try again later.");
  }

  record.count++;
  next();
};
