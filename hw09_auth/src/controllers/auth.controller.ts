import { Request, Response } from "express";

import { signupUser } from "../services/auth.service";

export const signupController = async (req: Request, res: Response) => {
  await signupUser(req.body);
  res.status(201).json({ message: "Signup successfully" });
};
