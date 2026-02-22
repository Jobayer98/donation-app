import { prisma } from "../lib/prisma";
import { loginDTO, registerDonorDTO, registerFundraiserDTO } from "../schema/auth.shcema";
import { hashPassword, verifyPassword } from "../utils/auth";
import { generateAccessToken } from "../utils/jwt";
import { addEmailJob } from "../jobs/email.queue";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError";
import logger from "../utils/logger";

class AuthService {
    async registerDonor(data: registerDonorDTO) {
        return this.register({ ...data, role: 'DONOR' });
    }

    async registerFundraiser(data: registerFundraiserDTO) {
        return this.register({ ...data, role: 'FUND_RAISER' });
    }

    private async register(data: { name: string; email: string; password: string; role: 'DONOR' | 'FUND_RAISER' }) {
        const hashPass = await hashPassword(data.password);
        if (!hashPass) throw new Error("Error hashing password");

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashPass,
                role: data.role,
                verificationToken
            },
            select: { id: true, role: true, email: true, name: true }
        });


        // Auto-subscribe fundraisers to free plan
        if (data.role === 'FUND_RAISER') {

            const freePlan = await prisma.plan.findUnique({ where: { type: 'FREE' } });

            if (freePlan) {
                const now = new Date();
                const endDate = new Date(now);
                endDate.setFullYear(endDate.getFullYear() + 100);

                await prisma.subscription.create({
                    data: {
                        userId: user.id,
                        planId: freePlan.id,
                        status: 'ACTIVE',
                        currentPeriodStart: now,
                        currentPeriodEnd: endDate,
                    }
                });
            }

        }

        // Add email jobs to background queue in parallel

        await Promise.all([
            addEmailJob({
                type: 'WELCOME',
                email: user.email,
                payload: { name: user.name }
            }),
            addEmailJob({
                type: 'VERIFICATION',
                email: user.email,
                payload: { name: user.name, token: verificationToken }
            })
        ]).catch(err => logger.error("⚠️ Failed to queue emails:", err));

        const token = generateAccessToken({ id: user.id, role: user.role });
        return { id: user.id, token, message: "Please check your email to verify your account" };
    }

    async login(data: loginDTO) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: { id: true, name: true, email: true, password: true, role: true, verificationStatus: true }
        });

        if (!user || !(await verifyPassword(data.password, user.password))) {
            return null;
        }

        const token = generateAccessToken({ id: user.id, role: user.role });
        return { id: user.id, name: user.name, email: user.email, token, verified: user.verificationStatus };
    }

    async verifyEmail(token: string) {
        const user = await prisma.user.findFirst({
            where: { verificationToken: token }
        });

        if (!user) {
            throw new ApiError(400, "Invalid or expired verification token");
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationStatus: true,
                verificationToken: null
            }
        });

        return { message: "Email verified successfully" };
    }

    async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return { message: "If email exists, reset link sent" };
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000);

        await prisma.user.update({
            where: { id: user.id },
            data: { resetToken, resetTokenExpiry }
        });

        await addEmailJob({
            type: 'PASSWORD_RESET',
            email,
            payload: { name: user.name, token: resetToken }
        });

        return { message: "If email exists, reset link sent" };
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            throw new ApiError(400, "Invalid or expired reset token");
        }

        const hashPass = await hashPassword(newPassword);
        if (!hashPass) throw new Error("Error hashing password");

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashPass,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        return { message: "Password reset successfully" };
    }
}

export default new AuthService();
