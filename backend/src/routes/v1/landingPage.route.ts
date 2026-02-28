import { Router } from "express";
import * as landingPageController from "../../controllers/landingPage.controller";
import { isAuthenticated, authorize } from "../../middlewares/auth.middleware";
import { appRateLimit } from "../../middlewares/rateLimit.middleware";
import { validateBody } from "../../middlewares/validate.middleware";
import { updateLandingPageContentSchema } from "../../schema/landingPage.schema";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

/**
 * @openapi
 * /api/v1/landing-page/manage:
 *   get:
 *     summary: Get landing page content for management (Private)
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/manage",
  appRateLimit,
  isAuthenticated,
  authorize("FUND_RAISER"),
  landingPageController.getLandingPageContent,
);

/**
 * @openapi
 * /api/v1/landing-page/manage:
 *   patch:
 *     summary: Update landing page content (Private)
 *     tags: [Landing Page]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 */
router.patch(
  "/manage",
  appRateLimit,
  isAuthenticated,
  authorize("FUND_RAISER"),
  upload.single("heroImage"),
  validateBody(updateLandingPageContentSchema),
  landingPageController.updateLandingPageContent,
);

/**
 * @openapi
 * /api/v1/landing-page/{slug}:
 *   get:
 *     summary: Get public landing page (Public)
 *     tags: [Landing Page]
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:slug", appRateLimit, landingPageController.getPublicLandingPage);

export default router;
