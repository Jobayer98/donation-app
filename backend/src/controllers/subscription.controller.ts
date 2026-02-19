import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import subscriptionService from "../services/subscription.service";

export const getPlans = asyncHandler(async (req: Request, res: Response) => {
  const plans = await subscriptionService.getPlans();
  res.json({ success: true, data: plans });
});

export const getCurrentSubscription = asyncHandler(async (req: Request, res: Response) => {
  const subscription = await subscriptionService.getCurrentSubscription(req.user!.id);
  res.json({ success: true, data: subscription });
});

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const { planId } = req.body;
  const subscription = await subscriptionService.subscribe(req.user!.id, planId);
  res.status(201).json({
    success: true,
    message: "Subscription created successfully",
    data: subscription
  });
});

export const cancelSubscription = asyncHandler(async (req: Request, res: Response) => {
  await subscriptionService.cancelSubscription(req.user!.id);
  res.json({
    success: true,
    message: "Subscription will be canceled at period end"
  });
});
