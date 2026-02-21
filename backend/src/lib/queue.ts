import { Queue, QueueOptions } from 'bullmq';
import { redisConfig } from '../config/redis';

const defaultOptions: QueueOptions = {
    connection: redisConfig,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
};

export const createQueue = (name: string) => {
    return new Queue(name, defaultOptions);
};
