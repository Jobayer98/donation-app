import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import onboardingService from "../services/onboarding.service";

export const getOnboardingStatus = asyncHandler(async (req: Request, res: Response) => {
  const status = await onboardingService.getStatus(req.user!.id);
  res.json({ success: true, data: status });
});

export const updateOnboardingStep = asyncHandler(async (req: Request, res: Response) => {
  const { step } = req.body;
  await onboardingService.updateStep(req.user!.id, step);
  res.json({ success: true, message: "Onboarding step updated" });
});

export const completeOnboarding = asyncHandler(async (req: Request, res: Response) => {
  await onboardingService.completeOnboarding(req.user!.id);
  res.json({ success: true, message: "Onboarding completed" });
});

export const skipOnboarding = asyncHandler(async (req: Request, res: Response) => {
  await onboardingService.skipOnboarding(req.user!.id);
  res.json({ success: true, message: "Onboarding skipped" });
});
