import app from "./app";
import { initializeSocket } from "./utils/socket";
import { bootstrap } from "./bootstrap";
import { appConfig } from "./config/config";
import logger from "./utils/logger";
import "./workers"; // Initialize background workers

const port = appConfig.port || 3000;

bootstrap().then(() => {
  const server = app.listen(port, () =>
    logger.info(`🚀 Server listening on port ${port}!`),
  );
  initializeSocket(server);
});
