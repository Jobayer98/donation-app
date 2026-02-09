import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { RegisterSchema } from "../schema/auth.shcema";

const router = Router();

router.post("/register", validateBody(RegisterSchema), register);

export default router;
