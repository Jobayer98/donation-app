import { Router } from "express";
import { closeCampaign, createCampaign, fundraiserCampaigns, fundraiserOverview, getCampaignDonations, getCampaignStats, publishCampaign, updateCampaign } from "../../controllers/campaign.controller";
import { createPaymentProvider, getMyPaymentProviders, togglePaymentProvider } from "../../controllers/paymentProvider.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { CreateCampaignSchema, UpdateCampaignSchema } from "../../schema/campaign.schema";
import { CreatePaymentProviderSchema } from "../../schema/paymentProvider.schema";

const router = Router();

router.use(isAuthenticated, authorize("FUND_RAISER"));

router.post("/campaigns", validateBody(CreateCampaignSchema), createCampaign);
router.patch("/campaigns/:id", validateBody(UpdateCampaignSchema), updateCampaign);
router.patch("/campaigns/:id/publish", publishCampaign);
router.patch("/campaigns/:id/close", closeCampaign);
router.get("/overview", fundraiserOverview);
router.get("/campaigns", fundraiserCampaigns);
router.get("/campaigns/:id/donations", getCampaignDonations);
router.get("/campaigns/:id/stats", getCampaignStats);

router.post("/payment-providers", validateBody(CreatePaymentProviderSchema), createPaymentProvider);
router.get("/payment-providers", getMyPaymentProviders);
router.patch("/payment-providers/:id/toggle", togglePaymentProvider);

export default router;