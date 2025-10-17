import express, { Express } from "express";
import cors from "cors";
import path from "node:path";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";


const corsOptions = {
  origin: "*",
  credentials: true,
};

const startServer = (): void => {
  const app: Express = express();
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static(path.resolve("public")));

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
