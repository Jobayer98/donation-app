import { Router } from "express";
import { adminOverview, adminCampaigns, adminCampaignStatus, adminUsers } from "../../controllers/admin.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { UpdateCampaignStatusSchema } from "../../schema/campaign.schema";

const router = Router();

router.use(isAuthenticated, authorize("ADMIN"));

router.get("/overview", adminOverview);
router.get("/campaigns", adminCampaigns);
router.get("/users", adminUsers);
router.patch("/campaigns/:id/status", validateBody(UpdateCampaignStatusSchema), adminCampaignStatus);

export default router;