import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { campaignStatusDTO, createCampaignDTO } from "../schema/campaign.schema";


export async function createCampaign(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

export async function findActiveCampaign(req: Request, res: Response) {
  try {
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
  } catch (error) {
    res.json({
      success: true,
      message: "Failed to retrive campaign data",
      error: error,
    });
  }
}

export async function findAllCampaign(req: Request, res: Response) {
  let { page = 1, limit = 10, status = undefined } = req.query;
  try {
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
  } catch (error) {
    res.json({
      success: true,
      message: "Failed to retrive campaign data",
      error: error,
    });
  }
}

export async function findOneCampaign(req: Request, res: Response) {
  try {
    let data = await prisma.campaign.findUnique({
      where: {
        id: String(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Campaign retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      success: true,
      message: "Failed to retrive campaign data",
      error: error,
    });
  }
}

export async function updateCampaign(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

export async function publishCampaign(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

export async function closeCampaign(req: Request, res: Response) {
  try {
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
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}
