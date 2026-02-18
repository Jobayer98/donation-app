import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import campaignService from "../services/campaign.service";
import { createCampaignDTO } from "../schema/campaign.schema";

export const createCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const data: createCampaignDTO = req.body;
    const campaign = await campaignService.create(data, req.user!.id);

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  },
);

export const findActiveCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const result = await campaignService.findActive(
      Number(page),
      Number(limit),
    );

    res.json({
      success: true,
      message: "Campaigns retrieved successfully",
      data: result,
    });
  },
);

export const findOneCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await campaignService.findById(String(req.params.id));

    res.json({
      success: true,
      message: "Campaign retrieved successfully",
      data,
    });
  },
);

export const updateCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await campaignService.update(String(req.params.id), req.body);

    res.json({
      success: true,
      message: "Campaign updated successfully",
      data,
    });
  },
);

export const publishCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await campaignService.updateStatus(
      String(req.params.id),
      "ACTIVE",
    );

    res.json({
      success: true,
      message: "Campaign published successfully",
      data,
    });
  },
);

export const closeCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await campaignService.updateStatus(
      String(req.params.id),
      "PAUSED",
    );

    res.json({
      success: true,
      message: "Campaign closed successfully",
      data,
    });
  },
);

export const fundraiserOverview = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await campaignService.getFundraiserOverview(req.user!.id);

    res.json({
      success: true,
      message: "Campaigns retrieved successfully",
      data,
    });
  },
);

export const fundraiserCampaigns = asyncHandler(
  async (req: Request, res: Response) => {
    const campaigns = await campaignService.getFundraiserCampaigns(
      req.user!.id,
    );

    res.json({
      success: true,
      message: "Campaigns retrieved successfully",
      data: campaigns.map((c) => ({
        id: c.id,
        title: c.title,
        status: c.status,
        goalAmount: c.goalAmount,
        raisedAmount: c.raisedAmount,
        donorCount: c._count.donations,
      })),
    });
  },
);

export const getCampaignDonations = asyncHandler(
  async (req: Request, res: Response) => {
    const donations = await campaignService.getCampaignDonations(
      String(req.params.id),
      req.user!.id,
    );

    res.json({
      success: true,
      message: "Donations retrieved successfully",
      data: donations.map((d) => ({
        id: d.id,
        amount: d.amount,
        donorName: d.donor?.name,
        status: d.status,
        createdAt: d.createdAt,
      })),
    });
  },
);

export const getCampaignStats = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await campaignService.getCampaignStats(
      String(req.params.id),
      req.user!.id,
    );

    res.json({
      success: true,
      message: "Campaign stats retrieved successfully",
      data,
    });
  },
);
