import { Request, Response, NextFunction } from 'express';
import client from 'prom-client';

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
    app: 'donation-backend'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestTimer = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

register.registerMetric(httpRequestTimer);

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const end = httpRequestTimer.startTimer();
    const route = req.route ? req.route.path : req.path;

    res.on('finish', () => {
        end({ method: req.method, route, code: res.statusCode.toString() });
    });

    next();
};

export const getMetrics = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
};
