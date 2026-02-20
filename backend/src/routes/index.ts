import { Router } from "express";
import v1Routes from "./v1";

const router = Router();

// API Versioning
router.use("/v1", v1Routes);

// Fallback for current /api/ routes to v1 for backward compatibility (optional but recommended during migration)
router.use("/", v1Routes);

export default router;
