import { prisma } from "./lib/prisma";
import { hashPassword } from "./utils/auth";
import logger from "./utils/logger";

export async function bootstrap() {
  try {
    // Create default admin if not exists
    const adminEmail = process.env.ADMIN_EMAIL || "admin@donationapp.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123456";

    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword);

      await prisma.user.create({
        data: {
          name: "System Admin",
          email: adminEmail,
          password: hashedPassword!,
          role: "ADMIN",
          verificationStatus: true
        }
      });

      logger.info("✅ Default admin created:");
      logger.info(`   Email: ${adminEmail}`);
      logger.info(`   Password: ${adminPassword}`);
      logger.info("   ⚠️  Please change the password after first login!");
    }
  } catch (error) {
    logger.error("❌ Bootstrap error:", error);
  }
}
