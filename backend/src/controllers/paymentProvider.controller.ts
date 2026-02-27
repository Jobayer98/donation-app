import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import paymentProviderService from "../services/paymentProvider.service";
import { decrypt } from "../utils/crypto";
import organizationService from "../services/organization.service";
import { ApiError } from "../utils/ApiError";

export const createPaymentProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, config, currency } = req.body;
    const organization = await organizationService.getUserOrganization(req.user!.id);

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    const provider = await paymentProviderService.create(
      name,
      config,
      organization.id,
      currency
    );
    res.status(201).json({
      success: true,
      message: "Payment provider created successfully",
      data: provider,
    });
  },
);

export const getMyPaymentProviders = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getUserOrganization(req.user!.id);

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    const providers = await paymentProviderService.findByFundraiser(
      organization.id,
    );
    res.json({ success: true, data: providers.map((provider) => ({ ...provider, config: JSON.parse(decrypt(provider.config as string)) })) });
  },
);

export const updatePaymentProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, config, currency } = req.body;
    const organization = await organizationService.getUserOrganization(req.user!.id);

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    const provider = await paymentProviderService.update(
      String(req.params.id),
      organization.id,
      { name, config, currency }
    );
    res.json({
      success: true,
      message: "Payment provider updated successfully",
      data: provider,
    });
  },
);

export const deletePaymentProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getUserOrganization(req.user!.id);

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    await paymentProviderService.delete(
      String(req.params.id),
      organization.id
    );
    res.json({
      success: true,
      message: "Payment provider deleted successfully",
    });
  },
);

export const togglePaymentProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getUserOrganization(req.user!.id);

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    const provider = await paymentProviderService.toggleStatus(
      String(req.params.id),
      organization.id,
    );
    res.json({
      success: true,
      message: "Provider status updated",
      data: provider,
    });
  },
);

export const setDefaultProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getUserOrganization(req.user!.id);

    if (!organization) {
      throw new ApiError(404, "Organization not found");
    }

    const provider = await paymentProviderService.setDefault(
      String(req.params.id),
      organization.id
    );
    res.json({
      success: true,
      message: "Default provider set successfully",
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
