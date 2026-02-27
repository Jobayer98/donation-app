import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import organizationService from "../services/organization.service";
import { uploadImage } from "../utils/cloudinary";
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
    const organizations = await organizationService.getUserOrganization(
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
    let data = updateOrganizationSchema.parse(req.body);

    if (req.file) {
      const logoUrl = await uploadImage(req.file);
      if (logoUrl) {
        data = { ...data, logoUrl };
      }
    }

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

export const getNotificationPreferences = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getUserOrganization(
      req.user!.id,
    );
    if (!organization) {
      throw new Error("Organization not found");
    }
    const preferences = await organizationService.getNotificationPreferences(
      organization.id,
      req.user!.id,
    );
    res.json({ success: true, message: "Notification preferences fetched successfully", data: preferences });
  },
);

export const updateNotificationPreferences = asyncHandler(
  async (req: Request, res: Response) => {
    const data = req.body;
    const preferences = await organizationService.updateNotificationPreferences(
      String(req.params.id),
      req.user!.id,
      data,
    );
    res.json({ success: true, message: "Notification preferences updated successfully", data: preferences });
  },
);

