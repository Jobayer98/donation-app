import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import organizationService from "../services/organization.service";
import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "../schema/organization.schema";

export const createOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createOrganizationSchema.parse(req.body);
    const organization = await organizationService.createOrganization(
      req.user!.id,
      data,
    );

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organization,
    });
  },
);

export const getMyOrganizations = asyncHandler(
  async (req: Request, res: Response) => {
    const organizations = await organizationService.getUserOrganizations(
      req.user!.id,
    );
    res.json({ success: true, data: organizations });
  },
);

export const getOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getOrganizationById(
      String(req.params.id),
      req.user!.id,
    );
    res.json({ success: true, data: organization });
  },
);

export const updateOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updateOrganizationSchema.parse(req.body);
    const organization = await organizationService.updateOrganization(
      String(req.params.id),
      req.user!.id,
      data,
    );

    res.json({
      success: true,
      message: "Organization updated successfully",
      data: organization,
    });
  },
);

export const deleteOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    await organizationService.deleteOrganization(
      String(req.params.id),
      req.user!.id,
    );
    res.json({ success: true, message: "Organization deleted successfully" });
  },
);
