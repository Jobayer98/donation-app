import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createCampaignDTO } from "../schema/campaign.schema";
import { success } from "zod";

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

export async function findAllCampaign(req: Request, res: Response) {
  try {
    let data = await prisma.campaign.findMany();

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

export function updateCampaign(req: Request, res: Response) {
  try {
    res.send("update campaign");
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}
export function publishCampaign(req: Request, res: Response) {
  try {
    res.send("update campaign");
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}
export function closeCampaign(req: Request, res: Response) {
  try {
    res.send("update campaign");
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}
