import { prisma } from "../lib/prisma";
import { campaignStatusDTO } from "../schema/campaign.schema";
import asyncHandler from "../utils/asyncHandler";

// admin overview 
export const adminOverview = asyncHandler(async (req, res) => {
    const totalUsers = await prisma.user.count({
        where: {
            NOT: {
                id: req.user?.id
            }
        }
    });

    const totalCampaigns = await prisma.campaign.count();

    const activeCampaigns = await prisma.campaign.count({
        where: {
            status: "ACTIVE"
        }
    });

    const totalDonations = await prisma.donation.count({
        where: {
            status: "SUCCESS"
        }
    });


    return res.status(200).json({
        success: true,
        data: {
            totalUsers,
            totalCampaigns,
            activeCampaigns,
            totalDonations,
        }
    });
})


export const adminCampaigns = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const campaigns = await prisma.campaign.findMany({
        where: {
            status: status as campaignStatusDTO
        },
        select: {
            id: true,
            title: true,
            status: true,
            raisedAmount: true,
            user: {
                select: {
                    name: true,
                }
            }
        }
    });

    const formattedCampaign = campaigns.map(campaign => {
        return {
            id: campaign.id,
            title: campaign.title,
            status: campaign.status,
            raisedAmount: campaign.raisedAmount,
            fundraiserName: campaign.user.name,
        }
    })
    return res.status(200).json({
        success: true,
        data: formattedCampaign
    });
})

export const adminCampaignStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const campaign = await prisma.campaign.update({
        where: {
            id: String(id)
        },
        data: {
            status: status as campaignStatusDTO
        }
    });
    return res.status(200).json({
        success: true,
        data: campaign
    });
})


export const adminUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: req.user?.id
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            campaigns: {
                select: {
                    id: true,
                    raisedAmount: true,
                }
            }
        }
    });

    const formattedUsers = users.map((user) => {
        const totalRaised = user.campaigns.reduce((acc, campaign) => {
            return acc + Number(campaign.raisedAmount);
        }, 0);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            campaignCount: user.campaigns.length,
            totalRaised: totalRaised
        }
    })
    return res.status(200).json({
        success: true,
        data: formattedUsers
    });
})