import donationRoute from "./donation.route";
import campaignRoute from "./campaign.route";
import paymentRoute from "./payment.route";
import authRoute from "./auth.route";
import fundraiserDashboardRoute from "./(fundraiser)/dashboard.route";
import { Router } from "express";

const router = Router();

router.use("/campaigns", campaignRoute);
router.use("/auth", authRoute);
router.use("/donations", donationRoute);
router.use("/payments", paymentRoute);
router.use("/dashboard/fundraiser", fundraiserDashboardRoute);

export default router;
