import { emailLayout } from './layout';

export const verificationEmail = (name: string, verifyUrl: string) => {
  const content = `
    <h2>Verify Your Email Address 📧</h2>
    <p>Hi ${name},</p>
    <p>Thank you for registering with Donation App! Please verify your email address to activate your account.</p>
    <p>Click the button below to verify your email:</p>
    <a href="${verifyUrl}" class="button">Verify Email</a>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #667eea;">${verifyUrl}</p>
    <p><strong>This link will expire in 24 hours.</strong></p>
    <p>Once verified, you'll be able to create campaigns and start fundraising.</p>
    <p>Best regards,<br>The Donation App Team</p>
  `;
  return emailLayout(content);
};
