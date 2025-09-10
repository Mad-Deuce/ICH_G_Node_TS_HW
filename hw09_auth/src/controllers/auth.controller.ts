import { Request, Response } from "express";

import { signupUser, emailConfirm } from "../services/auth.service";

export const signupController = async (req: Request, res: Response) => {
  await signupUser(req.body);
  res.status(201).json({ message: "Signup successfully" });
};

export const emailConfirmController = async (req: Request, res: Response) => {
  const user = await emailConfirm(req.query.token);
  res.status(200).json({ message: "Email confirmed", user });
};
