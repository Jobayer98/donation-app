import { emailLayout } from './layout';

export const welcomeEmail = (name: string) => {
  const content = `
    <h2>Welcome to Donation App! 🎉</h2>
    <p>Hi ${name},</p>
    <p>Thank you for joining our platform! We're excited to have you as part of our community.</p>
    <p>With Donation App, you can:</p>
    <ul>
      <li>Create and manage fundraising campaigns</li>
      <li>Accept donations from supporters worldwide</li>
      <li>Track your campaign performance in real-time</li>
      <li>Manage multiple payment providers</li>
    </ul>
    <p>Get started by verifying your email address and creating your first campaign.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Best regards,<br>The Donation App Team</p>
  `;
  return emailLayout(content);
};
