import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { campaignStatusDTO, createCampaignDTO } from "../schema/campaign.schema";
import asyncHandler from "../utils/asyncHandler";

const totalRaised = async () => {

}

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
    data: {
      id: campaign.id,
      status: campaign.status
    },
  });
});

export const findActiveCampaign = asyncHandler(async (req: Request, res: Response) => {
  let { page = 1, limit = 10 } = req.query;
  let data = await prisma.campaign.findMany({
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
      title: true,
      goalAmount: true,
      raisedAmount: true,
      category: true,
    }
  });

  res.json({
    success: true,
    message: "Campaigns retrieved successfully",
    data: {
      campaigns: data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: await prisma.campaign.count({
          where: {
            status: "ACTIVE",
          },
        }),
      },
    },
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
    select: {
      id: true,
      title: true,
      goalAmount: true,
      raisedAmount: true,
    }
  });

  res.json({
    success: true,
    message: "Campaigns retrieved successfully",
    data: {
      campaigns: data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: await prisma.campaign.count({
          where: {
            status: status ? status as campaignStatusDTO : undefined,
          },
        }),
      },
    },
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
    data: {
      id: data.id,
      status: data.status
    },
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
    data: {
      id: data.id,
      status: data.status
    },
  });
});

// fundraiser overview
export const fundraiserOverview = asyncHandler(async (req: Request, res: Response) => {
  let data = await prisma.campaign.findMany({
    where: {
      fundraiserId: req.user!.id,
    },
    include: {
      donations: true
    }
  })

  const totalRaised = await prisma.campaign.groupBy({
    by: ["status"],
    where: {
      id: {
        in: data.map((campaign) => campaign.id),
      },
      status: "ACTIVE",
    },
    _sum: {
      raisedAmount: true,
    },
  });

  let totalCampaigns = data.length;
  let activeCampaigns = data.filter((campaign) => campaign.status === "ACTIVE").length;

  // success donation
  const successDonations = data.map((campaign) => campaign.donations.filter((donation) => donation.status === "SUCCESS"));

  const totalDonors = successDonations.filter((donation) => donation.length > 0).length;

  res.json({
    success: true,
    message: "Campaigns retrieved successfully",
    data: {
      totalCampaigns,
      activeCampaigns,
      totalRaised: totalRaised.reduce((acc, campaign) => acc + Number(campaign._sum.raisedAmount), 0),
      totalDonors,
    },
  });
});

// fundraiser campaigns
export const fundraiserCampaigns = asyncHandler(async (req: Request, res: Response) => {
  const campaigns = await prisma.campaign.findMany({
    where: {
      fundraiserId: req.user!.id,
    },
    select: {
      id: true,
      title: true,
      status: true,
      goalAmount: true,
      raisedAmount: true,
      donations: {
        select: {
          donorId: true

        }
      }
    }
  });

  res.json({
    success: true,
    message: "Campaigns retrieved successfully",
    data: campaigns.map((campaign) => {
      return {
        id: campaign.id,
        title: campaign.title,
        status: campaign.status,
        goalAmount: campaign.goalAmount,
        raisedAmount: campaign.raisedAmount,
        donorCount: campaign.donations.length,
      };
    }),
  });
});

// fundraiser campaign donations
export const getCampaignDonations = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: String(req.params.id),
      fundraiserId: req.user!.id,
    },
    select: {
      id: true,
      createdAt: true,
      donations: {
        select: {
          id: true,
          amount: true,
          status: true,
          createdAt: true,
          donor: {
            select: {
              name: true
            }
          }
        }
      }
    }

  })

  // send only success donation
  const successDonations = campaign?.donations.filter((donation) => donation.status === "SUCCESS");

  res.json({
    success: true,
    message: "Donations retrieved successfully",
    data: successDonations?.map((donation) => {
      return {
        id: donation.id,
        amount: donation.amount,
        donorName: donation.donor?.name,
        status: donation.status,
        createdAt: donation.createdAt,
      };
    }),
  });
})

// fundraiser campaign stats
export const getCampaignStats = asyncHandler(async (req: Request, res: Response) => {
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: String(req.params.id),
      fundraiserId: req.user!.id,
    },
    select: {
      id: true,
      createdAt: true,
      raisedAmount: true,
      donations: {
        select: {
          id: true,
          amount: true,
          createdAt: true,
          status: true,
        }
      }
    }

  })

  const successDonations = campaign?.donations.filter((donation) => donation.status === "SUCCESS");

  res.json({
    success: true,
    message: "Campaign stats retrieved successfully",
    data: {
      totalRaised: Number(campaign?.raisedAmount),
      totalDonations: successDonations?.length,
    },
  });
})
