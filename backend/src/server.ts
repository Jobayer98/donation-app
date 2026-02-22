import app from "./app";
import { initializeSocket } from "./utils/socket";
import { bootstrap } from "./bootstrap";
import { appConfig } from "./config/config";
import "./workers"; // Initialize background workers

const port = appConfig.port || 3000;

bootstrap().then(() => {
  const server = app.listen(port, () =>
    console.log(`🚀 Server listening on port ${port}!`),
  );
  initializeSocket(server);
});
