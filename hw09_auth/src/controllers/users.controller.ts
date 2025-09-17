import { Request, Response } from "express";
import { setAuthCookies, clearAuthCookies } from "../utils/setupAuthCookies";

import {
  getAllUsers,
  deleteUser,
  confirmDeleteUser,
  updatePublicData,
  changeEmail,
  confirmChangeEmail,
  confirmNewEmail
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

export const updatePublicDataController = async (
  req: Request,
  res: Response
) => {
  const { user, accessToken, refreshToken } = await updatePublicData(
    req.auth.user,
    req.body
  );
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "User data successfully updated", user });
};

export const updateEmailController = async (req: Request, res: Response) => {
  changeEmail(req.auth.user, req.body.email);
  clearAuthCookies(res);
  res.json({
    message: `Confirm email change, a message containing a confirmation link has been sent to email: ${req.auth.user.email}`,
  });
};

export const confirmUpdateEmailController = async (
  req: Request,
  res: Response
) => {
  confirmChangeEmail(req.auth.user, req.query.new_email);
  clearAuthCookies(res);
  res.json({
    message: `Confirm new email, a message containing a confirmation link has been sent to email: ${req.query.new_email}`,
  });
};

export const saveNewEmailController = async (req: Request, res: Response) => {
  confirmNewEmail(req.auth.user, req.query.new_email);
  clearAuthCookies(res);
  res.json({
    message: `Email has been updated`,
  });
};
