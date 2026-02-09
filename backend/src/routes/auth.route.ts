import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { LoginSchema, RegisterSchema } from "../schema/auth.shcema";

const router = Router();

router.post("/register", validateBody(RegisterSchema), register);
router.post("/login", validateBody(LoginSchema), login);

export default router;
