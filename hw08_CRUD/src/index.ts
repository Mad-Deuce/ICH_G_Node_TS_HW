import "dotenv/config";
import { startServer } from "./server.ts";

function bootstrap(): void {
  startServer();
}

bootstrap();
