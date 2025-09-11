import { Request, Response } from "express";

import { getAllUsers } from "../services/users.service";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(201).json(users);
};
