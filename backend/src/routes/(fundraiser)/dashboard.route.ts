import { Router } from "express";
import { fundraiserCampaigns, fundraiserOverview, getCampaignDonations, getCampaignStats } from "../../controllers/campaign.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated);

router.get("/dashboard/fundraiser/overview", fundraiserOverview);
router.get("/dashboard/fundraiser/campaigns", fundraiserCampaigns);
router.get("/dashboard/fundraiser/campaigns/:id/donations", getCampaignDonations);
router.get("/dashboard/fundraiser/campaigns/:id/stats", getCampaignStats);

export default router;