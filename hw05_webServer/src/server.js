import express from "express";
import cors from "cors";

import homeRouter from "./routers/home.router.js";

import errorHandler from "./middlewares/errorHandler.js";
import authCheck from "./middlewares/authCheck.js";

const startServer = () => {
    const app = express();
    app.use(cors());

    app.use("/", authCheck, homeRouter);

    app.use(errorHandler);

    const port = Number(process.env.PORT);
    app.listen(port, () => console.log(`Server running on port: ${port}`));
}

export default startServer;