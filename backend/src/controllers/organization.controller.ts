import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import organizationService from "../services/organization.service";

export const createOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const organization = await organizationService.create(name, req.user!.id);

    res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organization,
    });
  },
);

export const getMyOrganizations = asyncHandler(
  async (req: Request, res: Response) => {
    const organizations = await organizationService.getByUser(req.user!.id);
    res.json({ success: true, data: organizations });
  },
);

export const getOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const organization = await organizationService.getById(
      String(req.params.id),
      req.user!.id,
    );
    res.json({ success: true, data: organization });
  },
);

export const updateOrganization = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, settings } = req.body;
    const organization = await organizationService.update(
      String(req.params.id),
      req.user!.id,
      { name, settings },
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
    await organizationService.delete(String(req.params.id), req.user!.id);
    res.json({ success: true, message: "Organization deleted successfully" });
  },
);

export const addMember = asyncHandler(async (req: Request, res: Response) => {
  const { email, role } = req.body;
  const member = await organizationService.addMember(
    String(req.params.id),
    req.user!.id,
    email,
    role,
  );

  res.status(201).json({
    success: true,
    message: "Member added successfully",
    data: member,
  });
});

export const updateMemberRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = req.body;
    const member = await organizationService.updateMemberRole(
      String(req.params.id),
      req.user!.id,
      String(req.params.memberId),
      role,
    );

    res.json({
      success: true,
      message: "Member role updated successfully",
      data: member,
    });
  },
);

export const removeMember = asyncHandler(
  async (req: Request, res: Response) => {
    await organizationService.removeMember(
      String(req.params.id),
      req.user!.id,
      String(req.params.memberId),
    );
    res.json({ success: true, message: "Member removed successfully" });
  },
);
