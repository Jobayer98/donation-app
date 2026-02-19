import { prisma } from "./lib/prisma";
import { hashPassword } from "./utils/auth";

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

      console.log("✅ Default admin created:");
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword}`);
      console.log("   ⚠️  Please change the password after first login!");
    }
  } catch (error) {
    console.error("❌ Bootstrap error:", error);
  }
}
