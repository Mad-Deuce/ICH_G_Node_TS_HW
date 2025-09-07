import { Router } from "express";

import { homeController } from "../controllers/home.controller";

const homeRouter: Router = Router();

homeRouter.use("/", homeController);

export default homeRouter;
