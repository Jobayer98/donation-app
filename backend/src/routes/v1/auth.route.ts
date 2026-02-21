import { Router } from "express";
import { login, registerDonor, registerFundraiser, verifyEmail, forgotPassword, resetPassword } from "../../controllers/auth.controller";
import { validateBody, validateQuery } from "../../middlewares/validate.middleware";
import { LoginSchema, RegisterDonorSchema, RegisterFundraiserSchema } from "../../schema/auth.shcema";
import { forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema } from "../../schema/verification.schema";
import { appRateLimit } from "../../middlewares/rateLimit.middleware";


const router = Router();

router.use(appRateLimit);

/**
 * @openapi
 * /api/v1/auth/register/donor:
 *   post:
 *     summary: Register a donor
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
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
 */
router.post("/register/donor", validateBody(RegisterDonorSchema), registerDonor);

/**
 * @openapi
 * /api/v1/auth/register/fundraiser:
 *   post:
 *     summary: Register a fundraiser
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
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
 */
router.post("/register/fundraiser", validateBody(RegisterFundraiserSchema), registerFundraiser);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
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
 */
router.post("/login", validateBody(LoginSchema), login);

/**
 * @openapi
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Verify email
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: query
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
 */
router.get("/verify-email", validateQuery(verifyEmailSchema), verifyEmail);

/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordSchema'
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
 */
router.post("/forgot-password", validateBody(forgotPasswordSchema), forgotPassword);

/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordSchema'
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
 */
router.post("/reset-password", validateBody(resetPasswordSchema), resetPassword);

export default router;
