import { Router } from "express";
import { deleteAllNotifications, deleteNotification, getNotifications, markAllAsRead, markAsRead } from "../controllers/notification.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated);

router.get("/", getNotifications);
router.put("/:id/read", markAsRead);
router.put("/read-all", markAllAsRead);
router.delete("/:id", deleteNotification);
router.delete("/", deleteAllNotifications);

export default router;
