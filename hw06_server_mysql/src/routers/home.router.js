import { Router } from "express";

import { homeController, postHomeController } from "../controllers/home.controller.js";


const homeRouter = Router();

homeRouter.get("/", homeController);
homeRouter.post("/", postHomeController);

export default homeRouter;