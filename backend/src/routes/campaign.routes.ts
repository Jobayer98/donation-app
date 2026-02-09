import { Router } from "express";
import {
  createCampaign,
  findAllCampaign,
  findOneCampaign,
  updateCampaign,
  publishCampaign,
  closeCampaign,
} from "../controllers/campaign.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { CreateCampaignSchema } from "../schema/campaign.schema";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/campaigns",
  isAuthenticated,
  validateBody(CreateCampaignSchema),
  createCampaign,
);
router.get("/campaigns", isAuthenticated, findAllCampaign);
router.get("/campaigns/:id", isAuthenticated, findOneCampaign);
router.patch("/campaigns/:id", isAuthenticated, updateCampaign);
router.patch("/campaign/:id/publish", isAuthenticated, publishCampaign);
router.patch("/campaign/:id/close", isAuthenticated, closeCampaign);

export default router;
