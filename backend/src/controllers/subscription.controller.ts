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
  const result = await subscriptionService.subscribe(req.user!.id, planId);
  const url = (result as any).url;
  res.status(201).json({
    success: true,
    message: url ? "Checkout session created" : "Subscribed successfully",
    data: result
  });
});

export const handleSuccess = asyncHandler(async (req: Request, res: Response) => {
  const { session_id } = req.query;
  if (!session_id) throw new Error("Missing session_id");

  await subscriptionService.finalizeSubscription(session_id as string);
  res.redirect("http://localhost:3000/subscription/success");
});

export const cancelSubscription = asyncHandler(async (req: Request, res: Response) => {
  const result = await subscriptionService.cancelSubscription(req.user!.id);
  res.json({
    success: true,
    message: "Subscription canceled",
    data: result
  });
});
