import { Router } from "express";

import {
  getAllArticlesController,
  addArticleController,
} from "../controllers/articles.controller";

const articlesRouter = Router();

articlesRouter.get("/", getAllArticlesController);
articlesRouter.post("/", addArticleController);

export default articlesRouter;
