import { Router } from "express";
import { adminOverview, adminCampaigns, adminCampaignStatus, adminUsers, updateUserRole } from "../../controllers/admin.controller";
import { cancelUserSubscription, createPlan, getAllPlans, getAllSubscriptions, getSubscriptionStats, togglePlanStatus, updatePlan } from "../../controllers/adminPlan.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { UpdateCampaignStatusSchema } from "../../schema/campaign.schema";
import { UpdateUserRoleSchema } from "../../schema/user.schema";
import { createPlanSchema, updatePlanSchema } from "../../schema/adminPlan.schema";

const router = Router();

router.use(isAuthenticated, authorize("ADMIN"));

router.get("/overview", adminOverview);
router.get("/campaigns", adminCampaigns);
router.get("/users", adminUsers);
router.patch("/campaigns/:id/status", validateBody(UpdateCampaignStatusSchema), adminCampaignStatus);
router.patch("/users/:id/role", validateBody(UpdateUserRoleSchema), updateUserRole);

// Plan Management
router.get("/plans", getAllPlans);
router.post("/plans", validateBody(createPlanSchema), createPlan);
router.put("/plans/:id", validateBody(updatePlanSchema), updatePlan);
router.patch("/plans/:id/toggle", togglePlanStatus);

// Subscription Management
router.get("/subscriptions", getAllSubscriptions);
router.get("/subscriptions/stats", getSubscriptionStats);
router.post("/subscriptions/:userId/cancel", cancelUserSubscription);

export default router;