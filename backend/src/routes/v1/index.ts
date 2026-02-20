import { Router } from "express";

// Public feature routes
import authRoute from "./auth.route";
import campaignRoute from "./campaign.route";
import donationRoute from "./donation.route";
import paymentRoute from "./payment.route";
import subscriptionRoute from "./subscription.route";
import organizationRoute from "./organization.route";
import onboardingRoute from "./onboarding.route";

// Notification & dashboard
import notificationRoute from "./notification.route";
import fundraiserDashboardRoute from "./fundraiser/dashboard.route";
import adminRoute from "./admin/dashboard.route";

// Dev-only routes
import testRoute from "./test.route";

const router = Router();

// Mount public APIs
router.use("/auth", authRoute);
router.use("/campaigns", campaignRoute);
router.use("/donations", donationRoute);
router.use("/payments", paymentRoute);
router.use("/subscriptions", subscriptionRoute);
router.use("/organizations", organizationRoute);
router.use("/onboarding", onboardingRoute);

// Notifications and dashboards
router.use("/notifications", notificationRoute);
router.use("/dashboard/fundraiser", fundraiserDashboardRoute);
router.use("/dashboard/admin", adminRoute);

// Dev-only routes: mount only when not in production
if (process.env.NODE_ENV !== "production") {
    router.use("/test", testRoute);
}

export default router;
