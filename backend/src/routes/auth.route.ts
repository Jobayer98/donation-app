import { Router } from "express";
import { login, register, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controller";
import { validateBody, validateQuery } from "../middlewares/validate.middleware";
import { LoginSchema, RegisterSchema } from "../schema/auth.shcema";
import { forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema } from "../schema/verification.schema";

const router = Router();

router.post("/register", validateBody(RegisterSchema), register);
router.post("/login", validateBody(LoginSchema), login);
router.get("/verify-email", validateQuery(verifyEmailSchema), verifyEmail);
router.post("/forgot-password", validateBody(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validateBody(resetPasswordSchema), resetPassword);

export default router;
