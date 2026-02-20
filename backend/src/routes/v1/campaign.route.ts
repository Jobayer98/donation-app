import { Router } from "express";
import {
  findOneCampaign,
  findActiveCampaign,
} from "../../controllers/campaign.controller";
import { getActiveProviders } from "../../controllers/paymentProvider.controller";

const router = Router();

router.get("/active", findActiveCampaign);
router.get("/:id", findOneCampaign);
router.get("/:id/payment-providers", getActiveProviders);

export default router;
