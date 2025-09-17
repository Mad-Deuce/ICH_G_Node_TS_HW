import { Request, Response } from "express";
import { setAuthCookies, clearAuthCookies } from "../utils/setupAuthCookies";

import {
  getAllUsers,
  deleteUser,
  confirmDeleteUser,
  updateUserPublicData,
} from "../services/users.service";

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.status(201).json(users);
};

export const deleteController = async (req: Request, res: Response) => {
  await deleteUser(req.auth.user.email);
  clearAuthCookies(res);
  res.json({
    message: `Confirm account delete, a message containing a confirmation link has been sent to email: ${req.auth.user.email}`,
  });
};

export const confirmDeleteController = async (req: Request, res: Response) => {
  await confirmDeleteUser(req.query.token);
  res.json({ message: "Account successfully deleted" });
};

export const updateUserPublicDataController = async (
  req: Request,
  res: Response
) => {
  const { user, accessToken, refreshToken } = await updateUserPublicData(
    req.auth.user.id,
    req.body
  );
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "User data successfully updated", user });
};
