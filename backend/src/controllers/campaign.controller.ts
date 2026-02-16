import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { campaignStatusDTO, createCampaignDTO } from "../schema/campaign.schema";
import asyncHandler from "../utils/asyncHandler";


export const createCampaign = asyncHandler(async (req: Request, res: Response) => {
  let data: createCampaignDTO = req.body;
  let campaign = await prisma.campaign.create({
    data: {
      title: data.title,
      description: data.description,
      goalAmount: data.goalAmount,
      category: data.category,
      startDate: data.startDate,
      endDate: data.endDate,
      raisedAmount: 0,
      type: data.type,
      fundraiserId: req.user!.id,
    },
  });

  res.status(201).json({
    success: true,
    message: "Campaign created successfully",
    data: campaign,
  });
});

export const findActiveCampaign = asyncHandler(async (req: Request, res: Response) => {
  let data = await prisma.campaign.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  res.json({
    success: true,
    message: "Campaigns retrieved successfully",
    data,
  });
});

export const findAllCampaign = asyncHandler(async (req: Request, res: Response) => {
  let { page = 1, limit = 10, status = undefined } = req.query;
  let data = await prisma.campaign.findMany({
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    where: {
      status: status ? status as campaignStatusDTO : undefined,
    },
  });

  res.json({
    success: true,
    message: "Campaigns retrieved successfully",
    data,
  });
});

export const findOneCampaign = asyncHandler(async (req: Request, res: Response) => {
  let data = await prisma.campaign.findUnique({
    where: {
      id: String(req.params.id),
    },
    include: {
      donations: true
    }
  });

  res.json({
    success: true,
    message: "Campaign retrieved successfully",
    data,
  });
});

export const updateCampaign = asyncHandler(async (req: Request, res: Response) => {
  let data = await prisma.campaign.update({
    where: {
      id: String(req.params.id),
    },
    data: req.body,
  });

  res.json({
    success: true,
    message: "Campaign updated successfully",
    data,
  });
});

export const publishCampaign = asyncHandler(async (req: Request, res: Response) => {
  let data = await prisma.campaign.update({
    where: {
      id: String(req.params.id),
    },
    data: {
      status: "ACTIVE",
    },
  });

  res.json({
    success: true,
    message: "Campaign published successfully",
    data,
  });
});

export const closeCampaign = asyncHandler(async (req: Request, res: Response) => {
  let data = await prisma.campaign.update({
    where: {
      id: String(req.params.id),
    },
    data: {
      status: "PAUSED",
    },
  });

  res.json({
    success: true,
    message: "Campaign closed successfully",
    data,
  });
});
