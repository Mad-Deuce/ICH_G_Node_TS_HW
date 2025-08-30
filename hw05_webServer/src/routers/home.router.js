import { Router } from "express";

import { getHomeController, putHomeController, deleteHomeController } from "../controllers/home.controller.js";

const homeRouter = Router();

homeRouter.get("/", getHomeController);
homeRouter.put("/", putHomeController);
homeRouter.delete("/", deleteHomeController);


export default homeRouter;