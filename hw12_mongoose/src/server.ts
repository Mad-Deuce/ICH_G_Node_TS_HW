import express from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";
import productsRouter from "./routers/products.router";

const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/products", productsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
