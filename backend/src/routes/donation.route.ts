import { Router } from "express";
import { createDonationIntent, findDonationById, findMyDonations, getUserDonationOverview } from "../controllers/donation.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { DonationSchema } from "../schema/donation.schema";

const router = Router();

router.use(isAuthenticated);

router.post("/", validateBody(DonationSchema), createDonationIntent);
router.get("/overview", getUserDonationOverview)
router.get("/me", findMyDonations);
router.get("/:id", findDonationById);

export default router;