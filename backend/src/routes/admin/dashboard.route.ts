import { Router } from "express";
import { adminOverview, adminCampaigns, adminCampaignStatus, adminUsers } from "../../controllers/admin.controller";
import { isAuthenticated } from "../../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated)

router.get("/overview", adminOverview)
router.get("/campaigns", adminCampaigns)
router.get("/users", adminUsers)
router.patch("/campaigns/status", adminCampaignStatus)

export default router;