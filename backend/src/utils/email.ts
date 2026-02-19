import nodemailer from 'nodemailer';
import { welcomeEmail } from '../templates/welcome';
import { verificationEmail } from '../templates/verification';
import { passwordResetEmail } from '../templates/passwordReset';
import { donationReceiptEmail } from '../templates/donationReceipt';
import { donationNotificationEmail } from '../templates/donationNotification';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = welcomeEmail(name);
  await sendEmail(email, 'Welcome to Donation App! 🎉', html);
};

export const sendVerificationEmail = async (email: string, name: string, token: string) => {
  const verifyUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;
  const html = verificationEmail(name, verifyUrl);
  await sendEmail(email, 'Verify Your Email Address', html);
};

export const sendPasswordResetEmail = async (email: string, name: string, token: string) => {
  const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;
  const html = passwordResetEmail(name, resetUrl);
  await sendEmail(email, 'Reset Your Password', html);
};

export const sendDonationReceipt = async (
  email: string,
  donorName: string,
  amount: number,
  currency: string,
  campaignTitle: string,
  transactionId: string
) => {
  const html = donationReceiptEmail({
    donorName,
    amount,
    currency,
    campaignTitle,
    transactionId,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });
  await sendEmail(email, 'Donation Receipt - Thank You!', html);
};

export const sendDonationNotification = async (
  email: string,
  fundraiserName: string,
  donorName: string,
  amount: number,
  currency: string,
  campaignTitle: string,
  isAnonymous: boolean
) => {
  const html = donationNotificationEmail({
    fundraiserName,
    donorName,
    amount,
    currency,
    campaignTitle,
    isAnonymous
  });
  await sendEmail(email, 'New Donation Received! 🎉', html);
};
