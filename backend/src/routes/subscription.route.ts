import { Router } from "express";
import { cancelSubscription, getCurrentSubscription, getPlans, subscribe } from "../controllers/subscription.controller";
import { isAuthenticated, authorize } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { subscribeSchema } from "../schema/subscription.schema";

const router = Router();

router.get("/plans", getPlans);
router.get("/current", isAuthenticated, getCurrentSubscription);
router.post("/subscribe", isAuthenticated, authorize("FUND_RAISER"), validateBody(subscribeSchema), subscribe);
router.post("/cancel", isAuthenticated, authorize("FUND_RAISER"), cancelSubscription);

export default router;
