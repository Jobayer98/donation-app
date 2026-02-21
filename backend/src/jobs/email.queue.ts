import { createQueue } from '../lib/queue';

export const EMAIL_QUEUE = 'email-queue';

export const emailQueue = createQueue(EMAIL_QUEUE);

export interface EmailJobData {
    type: 'WELCOME' | 'VERIFICATION' | 'PASSWORD_RESET' | 'DONATION_RECEIPT' | 'DONATION_NOTIFICATION';
    email: string;
    payload: any;
}

export const addEmailJob = async (data: EmailJobData) => {
    return await emailQueue.add(data.type, data);
};
