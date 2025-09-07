import { Router } from "express";

import { homeController } from "../controllers/home.controller";

const homeRouter: Router = Router();

homeRouter.get("/", homeController);

export default homeRouter;
