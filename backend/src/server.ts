import express from "express";
import { initializeSocket } from "./utils/socket";
import swaggerUi from 'swagger-ui-express';

import path from "path";
import apiRoute from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { bootstrap } from "./bootstrap";
import { swaggerSpec } from "./config/swagger";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.use("/api", apiRoute);
app.use(errorHandler);

bootstrap().then(() => {
  const server = app.listen(port, () =>
    console.log(`Server listening on port ${port}!`),
  );
  initializeSocket(server);
});
