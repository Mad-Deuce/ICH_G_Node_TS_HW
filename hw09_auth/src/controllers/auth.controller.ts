import { Request, Response } from "express";

import {
  signupUser,
  confirmEmail,
  loginUser,
  refreshTokens,
  logoutUser,
  deleteUser,
  confirmDeleteUser,
  updateUserPassword,
  resetUserPassword,
  confirmResetPassword,
} from "../services/auth.service";

const {
  ACCESS_TOKEN_MAX_AGE_MS = 900000,
  REFRESH_TOKEN_MAX_AGE_MS = 604800000,
} = process.env;

export const signupController = async (req: Request, res: Response) => {
  const email = await signupUser(req.body);
  res.status(201).json({
    message: `Signup successfully, a message containing a confirmation link has been sent to email: ${email}`,
  });
};

export const emailConfirmController = async (req: Request, res: Response) => {
  await confirmEmail(req.query.token);
  res.status(200).json({ message: "Email successfully confirmed" });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: Number(ACCESS_TOKEN_MAX_AGE_MS),
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(REFRESH_TOKEN_MAX_AGE_MS),
    })
    .status(201)
    .json({ message: "Login successfully", user });
};

export const refreshController = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await refreshTokens(
    req.cookies.refreshToken
  );
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: Number(ACCESS_TOKEN_MAX_AGE_MS),
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(REFRESH_TOKEN_MAX_AGE_MS),
    })
    .status(201)
    .json({ message: "Tokens successfully updated", user });
};

export const logoutController = async (req: Request, res: Response) => {
  await logoutUser(req.user.id);
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "Logout successfully" });
};

export const deleteController = async (req: Request, res: Response) => {
  await deleteUser(req.user.email);
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({
      message: `Confirm account delete, a message containing a confirmation link has been sent to email: ${req.user.email}`,
    });
};

export const confirmDeleteController = async (req: Request, res: Response) => {
  await confirmDeleteUser(req.query.token);
  res.status(200).json({ message: "Account successfully deleted" });
};

export const updatePasswordController = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await updateUserPassword(
    req.user.id,
    req.body.password
  );
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: Number(ACCESS_TOKEN_MAX_AGE_MS),
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(REFRESH_TOKEN_MAX_AGE_MS),
    })
    // .status(200)
    .json({ message: "Password successfully updated", user });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  await resetUserPassword(req.query.email);
  res
    .status(201)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({
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
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: Number(ACCESS_TOKEN_MAX_AGE_MS),
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: Number(REFRESH_TOKEN_MAX_AGE_MS),
    })
    .status(201)
    .json({ message: "Password successfully updated", user });
};
