import { emailLayout } from './layout';

interface DonationNotification {
  fundraiserName: string;
  donorName: string;
  amount: number;
  currency: string;
  campaignTitle: string;
  isAnonymous: boolean;
}

export const donationNotificationEmail = (details: DonationNotification) => {
  const donorDisplay = details.isAnonymous ? 'Anonymous Donor' : details.donorName;
  
  const content = `
    <h2>New Donation Received! 🎉</h2>
    <p>Hi ${details.fundraiserName},</p>
    <p>Great news! You've received a new donation for your campaign.</p>
    
    <div style="background: #f0f7ff; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h3 style="margin-top: 0; color: #667eea;">Donation Details</h3>
      <p style="font-size: 24px; margin: 10px 0;"><strong>${details.currency} ${details.amount}</strong></p>
      <p style="margin: 5px 0;"><strong>From:</strong> ${donorDisplay}</p>
      <p style="margin: 5px 0;"><strong>Campaign:</strong> ${details.campaignTitle}</p>
    </div>
    
    <p>This brings you one step closer to your fundraising goal. Keep up the great work!</p>
    <a href="${process.env.BASE_URL}/dashboard/fundraiser/campaigns" class="button">View Dashboard</a>
    <p>Best regards,<br>The Donation App Team</p>
  `;
  return emailLayout(content);
};
