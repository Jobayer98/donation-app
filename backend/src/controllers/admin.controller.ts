import asyncHandler from "../utils/asyncHandler";
import adminService from "../services/admin.service";
import { campaignStatusDTO } from "../schema/campaign.schema";
import { updateUserRoleDTO } from "../schema/user.schema";

export const adminOverview = asyncHandler(async (req, res) => {
  const data = await adminService.getOverview(req.user!.id);
  return res.status(200).json({ success: true, data });
});

export const adminCampaigns = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const campaigns = await adminService.getCampaigns(status as campaignStatusDTO);

  const formattedCampaigns = campaigns.map((c) => ({
    id: c.id,
    title: c.title,
    status: c.status,
    raisedAmount: c.raisedAmount,
    goalAmount: c.goalAmount,
    organizationName: c.organization.name,
    ownerName: c.organization.owner.name,
    createdAt: c.createdAt,
  }));

  return res.status(200).json({ success: true, data: formattedCampaigns });
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
    createdAt: u.createdAt,
    organizationCount: u.organizations.length,
    totalCampaigns: u.organizations.reduce((acc, org) => acc + org._count.campaigns, 0),
  }));

  return res.status(200).json({ success: true, data: formattedUsers });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data: updateUserRoleDTO = req.body;
  const user = await adminService.updateUserRole(String(id), data);
  return res.status(200).json({ success: true, data: user });
});

export const adminOrganizations = asyncHandler(async (req, res) => {
  const organizations = await adminService.getOrganizations();

  const formattedOrgs = organizations.map((org) => ({
    id: org.id,
    name: org.name,
    slug: org.slug,
    isActive: org.isActive,
    ownerName: org.owner.name,
    ownerEmail: org.owner.email,
    planName: org.subscription?.plan.name,
    planType: org.subscription?.plan.type,
    subscriptionStatus: org.subscription?.status,
    campaignCount: org._count.campaigns,
    createdAt: org.createdAt,
  }));

  return res.status(200).json({ success: true, data: formattedOrgs });
});

export const adminRecentDonations = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;
  const donations = await adminService.getRecentDonations(Number(limit));

  const formattedDonations = donations.map((d) => ({
    id: d.id,
    amount: d.amount,
    donorName: d.donor?.name || "Anonymous",
    donorEmail: d.donor?.email,
    campaignTitle: d.campaign.title,
    organizationName: d.campaign.organization.name,
    createdAt: d.createdAt,
  }));

  return res.status(200).json({ success: true, data: formattedDonations });
});
