import { Request, Response } from "express";

export const signupController = (req: Request, res: Response) => {
  res.status(201).json("In signup controller");
};
