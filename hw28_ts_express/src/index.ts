import "dotenv/config";
import startServer from "./server";

const bootstrap = async (): Promise<void> => {
  startServer();
};

bootstrap();
