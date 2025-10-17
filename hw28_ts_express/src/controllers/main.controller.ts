import { Request, Response } from "express";

export const postController = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(201).json({
    message: `Post request successfully processed`,
    data: req.body,
  });
};

export const getController = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "Get request successfully processed" });
};
