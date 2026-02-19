import nodemailer from 'nodemailer';

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

export const sendVerificationEmail = async (email: string, token: string) => {
  const verifyUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;
  const html = `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email:</p>
    <a href="${verifyUrl}">${verifyUrl}</a>
    <p>This link expires in 24 hours.</p>
  `;
  await sendEmail(email, 'Verify Your Email', html);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;
  const html = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link expires in 1 hour.</p>
  `;
  await sendEmail(email, 'Reset Your Password', html);
};
