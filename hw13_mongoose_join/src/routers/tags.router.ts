import { Router } from "express";

import {
  getAllTagsController,
  addTagController,
} from "../controllers/tags.controller";

const tagsRouter = Router();

tagsRouter.get("/", getAllTagsController);
tagsRouter.post("/", addTagController);

export default tagsRouter;
