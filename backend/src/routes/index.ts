import donationRoute from "./donation.route";
import campaignRoute from "./campaign.route";
import paymentRoute from "./payment.route";
import authRoute from "./auth.route";
import subscriptionRoute from "./subscription.route";
import organizationRoute from "./organization.route";
import onboardingRoute from "./onboarding.route";
import fundraiserDashboardRoute from "./fundraiser/dashboard.route";
import { Router } from "express";
import adminRoute from "./admin/dashboard.route";

const router = Router();

router.use("/campaigns", campaignRoute);
router.use("/auth", authRoute);
router.use("/donations", donationRoute);
router.use("/payments", paymentRoute);
router.use("/subscriptions", subscriptionRoute);
router.use("/organizations", organizationRoute);
router.use("/onboarding", onboardingRoute);
router.use("/dashboard/fundraiser", fundraiserDashboardRoute);
router.use("/dashboard/admin", adminRoute);

export default router;
