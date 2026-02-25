import express from "express";
import swaggerUi from 'swagger-ui-express';
import path from "path";
import { requestLogger } from "./middlewares/requestLogger.middleware";
import apiRoute from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { swaggerSpec } from "./config/swagger";
import { metricsMiddleware, getMetrics } from "./middlewares/metrics.middleware";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(requestLogger);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(metricsMiddleware);

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static Pages
app.get("/notify", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notify.html"));
});
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/success.html"));
});
app.get("/cancel", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cancel.html"));
});
app.get("/failed", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/failed.html"));
});

// Metrics
app.get("/api/metrics", getMetrics);

// Routes
app.use("/api", apiRoute);

// Error Handling
app.use(errorHandler);

export default app;
