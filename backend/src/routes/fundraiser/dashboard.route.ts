import { Router } from "express";
import { closeCampaign, createCampaign, fundraiserCampaigns, fundraiserOverview, getCampaignDonations, getCampaignStats, publishCampaign, updateCampaign } from "../../controllers/campaign.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { CreateCampaignSchema } from "../../schema/campaign.schema";

const router = Router();

router.use(isAuthenticated);

router.post(
    "/campaigns",
    validateBody(CreateCampaignSchema),
    createCampaign,
);
router.patch("/campaigns/:id", updateCampaign);
router.patch("/campaigns/:id/publish", publishCampaign);
router.patch("/campaigns/:id/close", closeCampaign);
router.get("/overview", fundraiserOverview);
router.get("/campaigns", fundraiserCampaigns);
router.get("/campaigns/:id/donations", getCampaignDonations);
router.get("/campaigns/:id/stats", getCampaignStats);

export default router;