import { Request, Response } from "express";

import { addPublisher, getPublisher } from "../services/publishers.service";

export const getAllPublisherController = async (
  req: Request,
  res: Response
) => {
  const publishers = await getPublisher();
  res.status(200).json(publishers);
};

export const addPublisherController = async (req: Request, res: Response) => {
  const publisher = await addPublisher(req.body);
  res.status(201).json(publisher);
};
