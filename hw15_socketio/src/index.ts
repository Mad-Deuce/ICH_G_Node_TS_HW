import "dotenv/config";
import startServer from "./server";
import startWebSocketServer from "./wsServer";

const bootstrap = async (): Promise<void> => {
  startServer();
  startWebSocketServer();
};

bootstrap();
