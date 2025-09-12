import { Request, Response } from "express";

import {
  signupUser,
  emailConfirm,
  loginUser,
  refreshTokens,
} from "../services/auth.service";

const {
  ACCESS_TOKEN_MAX_AGE_MS = 900000,
  REFRESH_TOKEN_MAX_AGE_MS = 604800000,
} = process.env;

export const signupController = async (req: Request, res: Response) => {
  await signupUser(req.body);
  res.status(201).json({ message: "Signup successfully" });
};

export const emailConfirmController = async (req: Request, res: Response) => {
  const user = await emailConfirm(req.query.token);
  res.status(200).json({ message: "Email confirmed", user });
};

export const loginController = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await loginUser(req.body);

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
