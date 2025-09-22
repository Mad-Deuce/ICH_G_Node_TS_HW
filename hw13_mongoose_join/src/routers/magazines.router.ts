import { Router } from "express";

import {
  getAllMagazinesController,
  addMagazineController,
} from "../controllers/magazines.controller";

const magazinesRouter = Router();

magazinesRouter.get("/", getAllMagazinesController);
magazinesRouter.post("/", addMagazineController);

export default magazinesRouter;
