import { Request, Response } from "express";

export const homeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).type("text/plain").send("Hello, World!");
};
