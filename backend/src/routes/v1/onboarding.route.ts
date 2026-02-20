import { Router } from "express";
import { completeOnboarding, getOnboardingStatus, skipOnboarding, updateOnboardingStep } from "../../controllers/onboarding.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated, authorize("FUND_RAISER"));

router.get("/status", getOnboardingStatus);
router.post("/step", updateOnboardingStep);
router.post("/complete", completeOnboarding);
router.post("/skip", skipOnboarding);

export default router;
