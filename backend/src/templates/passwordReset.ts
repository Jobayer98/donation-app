import { emailLayout } from './layout';

export const passwordResetEmail = (name: string, resetUrl: string) => {
  const content = `
    <h2>Reset Your Password 🔐</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the button below to create a new password:</p>
    <a href="${resetUrl}" class="button">Reset Password</a>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
    <p><strong>This link will expire in 1 hour.</strong></p>
    <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
    <p>Best regards,<br>The Donation App Team</p>
  `;
  return emailLayout(content);
};
