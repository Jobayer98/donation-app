import { Router } from "express";
import {
  findOneCampaign,
  findActiveCampaign
} from "../controllers/campaign.controller";

const router = Router();


router.get("/campaigns/active", findActiveCampaign);
router.get("/campaigns/:id", findOneCampaign);


export default router;
