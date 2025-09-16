import { Request, Response } from "express";

import { setAuthCookies, clearAuthCookies } from "../utils/setupAuthCookies";

import {
  signupUser,
  confirmEmail,
  loginUser,
  refreshTokens,
  logoutUser,
  resetUserPassword,
  confirmResetPassword,
} from "../services/auth.service";

import {
  deleteUserByEmail,
  confirmDeleteUser,
  updateUserPassword,
  updateUserPublicData,
} from "../services/users.service";

export const signupController = async (req: Request, res: Response) => {
  const email = await signupUser(req.body);
  res.status(201).json({
    message: `Signup successfully, a message containing a confirmation link has been sent to email: ${email}`,
  });
};

export const emailConfirmController = async (req: Request, res: Response) => {
  await confirmEmail(req.query.token);
  res.json({ message: "Email successfully confirmed" });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "Login successfully", user });
};

export const refreshController = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await refreshTokens(
    req.cookies.refreshToken
  );
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "Tokens successfully updated", user });
};

export const logoutController = async (req: Request, res: Response) => {
  await logoutUser(req.auth.user.id);
  clearAuthCookies(res);
  res.json({ message: "Logout successfully" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  await resetUserPassword(req.query.email);
  clearAuthCookies(res);
  res.json({
    message: `Confirm reset password, a message containing a confirmation link has been sent to email: ${req.query.email}`,
  });
};

export const confirmResetPasswordController = async (
  req: Request,
  res: Response
) => {
  const { user, accessToken, refreshToken } = await confirmResetPassword(
    req.query.token,
    req.body.password
  );
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ message: "Password successfully updated", user });
};
