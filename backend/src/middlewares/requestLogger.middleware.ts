import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Log request
    logger.http(`${req.method} ${req.url} - IP: ${req.ip}`);

    // Wait for response to finish
    res.on('finish', () => {
        const duration = Date.now() - start;
        const statusCode = res.statusCode;

        const message = `${req.method} ${req.originalUrl || req.url} ${statusCode} ${duration}ms`;

        if (statusCode >= 500) {
            logger.error(message);
        } else if (statusCode >= 400) {
            logger.warn(message);
        } else {
            logger.info(message);
        }
    });

    next();
};
