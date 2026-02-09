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

const router = Router();

router.post("/campaigns", validateBody(CreateCampaignSchema), createCampaign);
router.get("/campaigns", findAllCampaign);
router.get("/campaigns/:id", findOneCampaign);
router.patch("/campaigns/:id", updateCampaign);
router.patch("/campaign/:id/publish", publishCampaign);
router.patch("/campaign/:id/close", closeCampaign);

export default router;
