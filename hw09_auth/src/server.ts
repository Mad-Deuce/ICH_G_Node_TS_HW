import express from "express";

const startServer = () => {
  const app = express();

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
