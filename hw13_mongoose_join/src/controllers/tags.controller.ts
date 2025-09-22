import { Request, Response } from "express";

import { getTags, addTag } from "../services/tags.service";

export const getAllTagsController = async (
  req: Request,
  res: Response
) => {
  const tags = await getTags();
  res.status(200).json(tags);
};

export const addTagController = async (
  req: Request,
  res: Response
) => {
  const tag = await addTag(req.body);
  res.status(201).json(tag);
};