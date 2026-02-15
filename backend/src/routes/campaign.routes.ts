import { Router } from "express";
import {
  createCampaign,
  findAllCampaign,
  findOneCampaign,
  updateCampaign,
  publishCampaign,
  closeCampaign,
  findActiveCampaign
} from "../controllers/campaign.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { CreateCampaignSchema } from "../schema/campaign.schema";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();


router.get("/campaigns/active", findActiveCampaign);
router.get("/campaigns/:id", findOneCampaign);

router.use(isAuthenticated);

router.post(
  "/campaigns",
  validateBody(CreateCampaignSchema),
  createCampaign,
);

router.get("/campaigns", findAllCampaign);
router.patch("/campaigns/:id", updateCampaign);
router.patch("/campaigns/:id/publish", publishCampaign);
router.patch("/campaigns/:id/close", closeCampaign);

export default router;
