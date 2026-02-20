import { Router } from "express";
import {
  createDonationIntent,
  findDonationById,
  findMyDonations,
  getUserDonationOverview,
} from "../../controllers/donation.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { donationRateLimit } from "../../middlewares/rateLimit.middleware";
import { DonationSchema } from "../../schema/donation.schema";

const router = Router();

router.post("/", donationRateLimit, validateBody(DonationSchema), createDonationIntent);

router.use(isAuthenticated, authorize("DONOR"));

router.get("/overview", getUserDonationOverview);
router.get("/me", findMyDonations);
router.get("/:id", findDonationById);

export default router;
