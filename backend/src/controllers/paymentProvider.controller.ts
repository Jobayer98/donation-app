import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import paymentProviderService from "../services/paymentProvider.service";

export const createPaymentProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, config } = req.body;
    const provider = await paymentProviderService.create(
      name,
      JSON.stringify(config),
      req.user!.id,
    );
    res.status(201).json({
      success: true,
      message: "Payment provider created",
      data: provider,
    });
  },
);

export const getMyPaymentProviders = asyncHandler(
  async (req: Request, res: Response) => {
    const providers = await paymentProviderService.findByFundraiser(
      req.user!.id,
    );
    res.json({ success: true, data: providers });
  },
);

export const togglePaymentProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const provider = await paymentProviderService.toggleStatus(
      String(req.params.id),
      req.user!.id,
    );
    res.json({
      success: true,
      message: "Provider status updated",
      data: provider,
    });
  },
);

export const getActiveProviders = asyncHandler(
  async (req: Request, res: Response) => {
    const providers = await paymentProviderService.getActiveByCampaign(
      String(req.params.id),
    );
    res.json({ success: true, data: providers });
  },
);
