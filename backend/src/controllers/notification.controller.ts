import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import notificationService from "../services/notification.service";

export const getNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await notificationService.getByUser(
      req.user!.id,
      page,
      limit,
    );
    res.json({ success: true, data: result });
  },
);

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  await notificationService.markAsRead(String(req.params.id), req.user!.id);
  res.json({ success: true, message: "Notification marked as read" });
});

export const markAllAsRead = asyncHandler(
  async (req: Request, res: Response) => {
    await notificationService.markAllAsRead(req.user!.id);
    res.json({ success: true, message: "All notifications marked as read" });
  },
);

export const deleteNotification = asyncHandler(
  async (req: Request, res: Response) => {
    await notificationService.delete(String(req.params.id), req.user!.id);
    res.json({ success: true, message: "Notification deleted" });
  },
);

export const deleteAllNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    await notificationService.deleteAll(req.user!.id);
    res.json({ success: true, message: "All notifications deleted" });
  },
);
