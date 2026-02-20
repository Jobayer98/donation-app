import { Router } from "express";
import notificationService from "../../services/notification.service";

const router = Router();

// Block in production for safety
router.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ success: false, message: "Not found" });
  }
  next();
});

// Notification test route (development only)
router.post("/notify", async (req, res, next) => {
  try {
    const { userId, title, message, metadata } = req.body;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });

    const notification = await notificationService.create(
      userId,
      "SYSTEM",
      title || "Test Notification",
      message || "This is a test notification",
      metadata || {},
    );

    res.json({ success: true, data: notification });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
