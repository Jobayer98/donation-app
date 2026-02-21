import { Worker, Job } from 'bullmq';
import { redisConfig } from '../config/redis';
import { EMAIL_QUEUE, EmailJobData } from '../jobs/email.queue';
import * as emailUtils from '../utils/email';

export const emailWorker = new Worker(
    EMAIL_QUEUE,
    async (job: Job<EmailJobData>) => {
        const { type, email, payload } = job.data;

        console.log(`Processing email job: ${type} to ${email}`);

        try {
            switch (type) {
                case 'WELCOME':
                    await emailUtils.sendWelcomeEmail(email, payload.name);
                    break;
                case 'VERIFICATION':
                    await emailUtils.sendVerificationEmail(email, payload.name, payload.token);
                    break;
                case 'PASSWORD_RESET':
                    await emailUtils.sendPasswordResetEmail(email, payload.name, payload.token);
                    break;
                case 'DONATION_RECEIPT':
                    await emailUtils.sendDonationReceipt(
                        email,
                        payload.donorName,
                        payload.amount,
                        payload.currency,
                        payload.campaignTitle,
                        payload.transactionId
                    );
                    break;
                case 'DONATION_NOTIFICATION':
                    await emailUtils.sendDonationNotification(
                        email,
                        payload.fundraiserName,
                        payload.donorName,
                        payload.amount,
                        payload.currency,
                        payload.campaignTitle,
                        payload.isAnonymous
                    );
                    break;
            }
        } catch (error) {
            console.error(`Failed to send email ${type} to ${email}:`, error);
            throw error; // Rethrow to let BullMQ handle retries
        }
    },
    {
        connection: redisConfig,
        concurrency: 5,
    }
);

emailWorker.on('completed', (job) => {
    console.log(`Email job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
    console.log(`Email job ${job?.id} failed with error: ${err.message}`);
});
