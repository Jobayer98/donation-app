import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { sendNotification } from "../utils/socket";

class NotificationService {
  async create(
    userId: string,
    type: string,
    title: string,
    message: string,
    metadata?: any,
  ) {
    const notification = await prisma.notification.create({
      data: { userId, type: type as any, title, message, metadata },
    });
    sendNotification(userId, notification);
    return notification;
  }

  async getByUser(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, read: false } }),
    ]);

    return {
      notifications,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      unreadCount,
    };
  }

  async markAsRead(id: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) throw new ApiError(404, "Notification not found");
    if (notification.userId !== userId)
      throw new ApiError(403, "Access denied");

    return prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  }

  async delete(id: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) throw new ApiError(404, "Notification not found");
    if (notification.userId !== userId)
      throw new ApiError(403, "Access denied");

    await prisma.notification.delete({ where: { id } });
  }

  async deleteAll(userId: string) {
    await prisma.notification.deleteMany({ where: { userId } });
  }
}

export default new NotificationService();
