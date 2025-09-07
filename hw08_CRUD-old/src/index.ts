import "dotenv/config";
import { startServer } from "./server.ts";
import { connectDatabase } from "./db/connectDatabase.ts";

async function bootstrap(): Promise<void> {
  await connectDatabase();
  startServer();
}

bootstrap();
