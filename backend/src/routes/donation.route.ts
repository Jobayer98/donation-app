import { Router } from "express";
import { createDonationIntent, updateDonationStatus } from "../controllers/donation.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated);

router.post("/donations", createDonationIntent);
router.patch("/donations/:id/status", updateDonationStatus);

export default router;