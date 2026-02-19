import { Router } from "express";
import { closeCampaign, createCampaign, fundraiserCampaigns, fundraiserOverview, getCampaignDonations, getCampaignStats, publishCampaign, updateCampaign } from "../../controllers/campaign.controller";
import { createPaymentProvider, deletePaymentProvider, getMyPaymentProviders, setDefaultProvider, togglePaymentProvider, updatePaymentProvider } from "../../controllers/paymentProvider.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { requireVerified } from "../../middlewares/verification.middleware";
import { checkCampaignLimit, checkPaymentProviderLimit } from "../../middlewares/planLimits.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { CreateCampaignSchema, UpdateCampaignSchema } from "../../schema/campaign.schema";
import { CreatePaymentProviderSchema, UpdatePaymentProviderSchema } from "../../schema/paymentProvider.schema";

const router = Router();

router.use(isAuthenticated, authorize("FUND_RAISER"), requireVerified);

router.post("/campaigns", validateBody(CreateCampaignSchema), checkCampaignLimit, createCampaign);
router.patch("/campaigns/:id", validateBody(UpdateCampaignSchema), updateCampaign);
router.patch("/campaigns/:id/publish", publishCampaign);
router.patch("/campaigns/:id/close", closeCampaign);
router.get("/overview", fundraiserOverview);
router.get("/campaigns", fundraiserCampaigns);
router.get("/campaigns/:id/donations", getCampaignDonations);
router.get("/campaigns/:id/stats", getCampaignStats);

router.post("/payment-providers", validateBody(CreatePaymentProviderSchema), checkPaymentProviderLimit, createPaymentProvider);
router.get("/payment-providers", getMyPaymentProviders);
router.put("/payment-providers/:id", validateBody(UpdatePaymentProviderSchema), updatePaymentProvider);
router.delete("/payment-providers/:id", deletePaymentProvider);
router.patch("/payment-providers/:id/toggle", togglePaymentProvider);
router.patch("/payment-providers/:id/default", setDefaultProvider);

export default router;