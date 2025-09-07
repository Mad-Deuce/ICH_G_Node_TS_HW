import express from "express";
import cors from "cors";

import homeRouter from "./routers/home.router";

const startServer = (): void => {
  const app = express();
  app.use(cors());

  app.use("/", homeRouter);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
