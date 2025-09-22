import { Request, Response } from "express";

import { getArticles, addArticles } from "../services/articles.service";

export const getAllArticlesController = async (
  req: Request,
  res: Response
) => {
  const articles = await getArticles();
  res.status(200).json(articles);
};

export const addArticleController = async (
  req: Request,
  res: Response
) => {
  const article = await addArticles(req.body);
  res.status(201).json(article);
};