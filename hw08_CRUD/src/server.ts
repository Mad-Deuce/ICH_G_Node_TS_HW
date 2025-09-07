import express from "express";
import cors from "cors";

import homeRouter from "./routers/home.router";
import notFoundHandler from "./middlewares/notFoundHandler";

const startServer = (): void => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/", homeRouter);

  app.use(notFoundHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
