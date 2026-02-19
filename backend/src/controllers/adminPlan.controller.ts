import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import adminPlanService from "../services/adminPlan.service";

export const getAllPlans = asyncHandler(async (req: Request, res: Response) => {
  const plans = await adminPlanService.getAllPlans();
  res.json({ success: true, data: plans });
});

export const createPlan = asyncHandler(async (req: Request, res: Response) => {
  const plan = await adminPlanService.createPlan(req.body);
  res.status(201).json({
    success: true,
    message: "Plan created successfully",
    data: plan,
  });
});

export const updatePlan = asyncHandler(async (req: Request, res: Response) => {
  const plan = await adminPlanService.updatePlan(
    String(req.params.id),
    req.body,
  );
  res.json({
    success: true,
    message: "Plan updated successfully",
    data: plan,
  });
});

export const togglePlanStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const plan = await adminPlanService.togglePlanStatus(String(req.params.id));
    res.json({
      success: true,
      message: "Plan status updated",
      data: plan,
    });
  },
);

export const getAllSubscriptions = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await adminPlanService.getAllSubscriptions(page, limit);
    res.json({ success: true, data: result });
  },
);

export const getSubscriptionStats = asyncHandler(
  async (req: Request, res: Response) => {
    const stats = await adminPlanService.getSubscriptionStats();
    res.json({ success: true, data: stats });
  },
);

export const cancelUserSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    await adminPlanService.cancelUserSubscription(String(req.params.userId));
    res.json({
      success: true,
      message: "Subscription canceled successfully",
    });
  },
);
