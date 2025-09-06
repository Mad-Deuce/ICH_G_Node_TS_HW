import express from "express";
import cors from "cors";

export function startServer(): void {
  const app = express();
  app.use(cors());

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
}
