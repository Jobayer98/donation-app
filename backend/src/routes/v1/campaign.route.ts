import { Router } from "express";
import {
  findOneCampaign,
  findActiveCampaign,
} from "../../controllers/campaign.controller";
import { getActiveProviders } from "../../controllers/paymentProvider.controller";
import { appRateLimit } from "../../middlewares/rateLimit.middleware";

const router = Router();

router.use(appRateLimit);

/**
 * @openapi
 * /api/v1/campaign/active:
 *   get:
 *     summary: Get active campaign
 *     tags: [Campaign]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseSchema'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 */
router.get("/active", findActiveCampaign);

/**
 * @openapi
 * /api/v1/campaign/{id}:
 *   get:
 *     summary: Get campaign by id
 *     tags: [Campaign]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseSchema'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 */
router.get("/:id", findOneCampaign);

/**
 * @openapi
 * /api/v1/campaign/{id}/payment-providers:
 *   get:
 *     summary: Get payment providers by campaign id
 *     tags: [Campaign]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseSchema'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseSchema'
 */
router.get("/:id/payment-providers", getActiveProviders);

export default router;
