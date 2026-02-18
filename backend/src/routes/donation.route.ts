import { Router } from "express";
import { createDonationIntent, findAllDonations, findDonationById, findMyDonations, getUserDonationOverview, updateDonationStatus } from "../controllers/donation.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { DonationSchema, UpdateDonationSchema } from "../schema/donation.schema";

const router = Router();

router.use(isAuthenticated);

router.post("/donations", validateBody(DonationSchema), createDonationIntent);
router.patch("/donations/:id/status", validateBody(UpdateDonationSchema), updateDonationStatus);
router.get("/donations", findAllDonations);
router.get("/donations/me", findMyDonations);
router.get("/donations/overview", getUserDonationOverview)
router.get("/donations/:id", findDonationById);

export default router;