import express from "express";
import cors from "cors";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import productRouter from "./routers/product.router.js";
import homeRouter from "./routers/home.router.js";

export const startServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/", homeRouter)
    app.use("/api/products", productRouter)

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server start on port ${port}`));
}
