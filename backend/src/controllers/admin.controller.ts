import asyncHandler from "../utils/asyncHandler";
import adminService from "../services/admin.service";
import { campaignStatusDTO } from "../schema/campaign.schema";

export const adminOverview = asyncHandler(async (req, res) => {
  const data = await adminService.getOverview(req.user!.id);
  return res.status(200).json({ success: true, data });
});

export const adminCampaigns = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const campaigns = await adminService.getCampaigns(
    status as campaignStatusDTO,
  );

  const formattedCampaign = campaigns.map((c) => ({
    id: c.id,
    title: c.title,
    status: c.status,
    raisedAmount: c.raisedAmount,
    fundraiserName: c.user.name,
  }));

  return res.status(200).json({ success: true, data: formattedCampaign });
});

export const adminCampaignStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const campaign = await adminService.updateCampaignStatus(String(id), status);
  return res.status(200).json({ success: true, data: campaign });
});

export const adminUsers = asyncHandler(async (req, res) => {
  const users = await adminService.getUsers(req.user!.id);

  const formattedUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    campaignCount: u.campaigns.length,
    totalRaised: u.campaigns.reduce(
      (acc, c) => acc + Number(c.raisedAmount),
      0,
    ),
  }));

  return res.status(200).json({ success: true, data: formattedUsers });
});
