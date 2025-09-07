import express from "express";
import cors from "cors";

const startServer = (): void => {
  const app = express();
  app.use(cors());

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(3000, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
