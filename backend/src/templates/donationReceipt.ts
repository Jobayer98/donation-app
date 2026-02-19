import { emailLayout } from './layout';

interface DonationDetails {
  donorName: string;
  amount: number;
  currency: string;
  campaignTitle: string;
  transactionId: string;
  date: string;
}

export const donationReceiptEmail = (details: DonationDetails) => {
  const content = `
    <h2>Thank You for Your Donation! 💝</h2>
    <p>Dear ${details.donorName},</p>
    <p>Thank you for your generous donation! Your support makes a real difference.</p>
    
    <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Donation Receipt</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0;"><strong>Campaign:</strong></td>
          <td style="padding: 8px 0;">${details.campaignTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Amount:</strong></td>
          <td style="padding: 8px 0; font-size: 18px; color: #667eea;">${details.currency} ${details.amount}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Transaction ID:</strong></td>
          <td style="padding: 8px 0;">${details.transactionId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Date:</strong></td>
          <td style="padding: 8px 0;">${details.date}</td>
        </tr>
      </table>
    </div>
    
    <p>Your contribution helps bring this campaign closer to its goal. The campaign organizer has been notified of your donation.</p>
    <p>Keep this email as a record of your donation.</p>
    <p>With gratitude,<br>The Donation App Team</p>
  `;
  return emailLayout(content);
};
