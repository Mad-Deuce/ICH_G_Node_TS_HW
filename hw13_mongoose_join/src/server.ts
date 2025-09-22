import express from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import publishersRouter from "./routers/publishers.router";
import magazinesRouter from "./routers/magazines.router";
import tagsRouter from "./routers/tags.router";
import articlesRouter from "./routers/articles.router";

const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/publishers", publishersRouter);
  app.use("/api/magazines", magazinesRouter);
  app.use("/api/articles", articlesRouter);
  app.use("/api/tags", tagsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
