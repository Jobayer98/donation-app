import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createCampaignDTO } from "../schema/campaign.schema";

export async function createCampaign(req: Request, res: Response) {
  try {
    let data: createCampaignDTO = req.body;
    let campaign = await prisma.campaign.create({
      data: {
        title: data.title,
        description: data.description,
        goal_amount: data.goalAmount,
        category: data.category,
        start_date: data.startDate,
        end_date: data.endDate,
        raised_amount: 0,
        type: data.type,
        status: data.status,
        fundraiserId: "ccaca9ea-0761-4dff-8049-5f65c9a8b86e",
      },
    });

    res.status(201).json({
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
      data,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}

export async function findOneCampaign(req: Request, res: Response) {
  try {
    let id = "019c41c2-f1dd-74e5-9b16-cdc000a7382a";
    let data = await prisma.campaign.findUnique({
      where: {
        id: id,
      },
    });

    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
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
