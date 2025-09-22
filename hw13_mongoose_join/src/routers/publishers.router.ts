import { Router } from "express";

import {
  addPublisherController,
  getAllPublisherController,
} from "../controllers/publishers.controller";

const publishersRouter = Router();

publishersRouter.get("/", getAllPublisherController);
publishersRouter.post("/", addPublisherController);

export default publishersRouter;
