import winston from 'winston';
import { appConfig } from '../config/config';

const { combine, timestamp, printf, colorize, errors, splat, json } = winston.format;

// Custom format for console logging
const consoleFormat = combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    printf(({ timestamp, level, message, stack, ...meta }) => {
        let metaString = '';
        if (Object.keys(meta).length > 0) {
            metaString = `\n${JSON.stringify(meta, null, 2)}`;
        }
        return `[${timestamp}] ${level}: ${message}${stack ? `\n${stack}` : ''}${metaString}`;
    })
);

// Custom format for file logging (JSON)
const fileFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    json()
);

const logger = winston.createLogger({
    level: appConfig.node_env === 'development' ? 'debug' : 'info',
    format: fileFormat,
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
        }),
    ],
    exitOnError: false,
});

export default logger;
