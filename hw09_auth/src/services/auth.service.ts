import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../utils/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createTokens from "../utils/createTokens";

import User from "../db/models/User";
import Session from "../db/models/Session";

const {
  BASE_URL,
  JWT_SECRET = "secret",
  ACCESS_TOKEN_MAX_AGE_MS = 900000,
  REFRESH_TOKEN_MAX_AGE_MS = 604800000,
} = process.env;

export const signupUser = async (payload: any) => {
  const { password, email } = payload;
  const passwordHash = hashPassword(password);
  const newUser = await User.create({ ...payload, password: passwordHash });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/email-confirm?token=${token}" target="_blank">Confirm email</a>`,
  };

  await sendEmail(verifyEmail);

  return newUser;
};

export const confirmEmail = async (token: any) => {
  const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
  let email: string;
  if (typeof decoded === "object" && "email" in decoded) {
    email = decoded.email;
  } else {
    throw new HttpError(401, "Invalid token payload");
  }
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await user.update({ verified: true });
  return {
    id: user.get("id"),
    email: user.get("email"),
    fullname: user.get("fullname"),
    username: user.get("username"),
  };
};

export const loginUser = async (payload: any) => {
  const { password: loginPassword, email } = payload;

  const user = await User.findOne({ where: { email: email } });
  if (!user) throw new HttpError(401, "Email or password invalid");
  const { id, verified, password, fullname, username } = user.toJSON();

  if (!verified) throw new HttpError(403, "Email not verified");

  if (!comparePassword(loginPassword, password))
    throw new HttpError(401, "Email or password invalid");

  await Session.destroy({ where: { userId: id } });

  const { accessToken, refreshToken } = createTokens({ email });

  await Session.create({ userId: id, accessToken, refreshToken });

  return {
    user: { id, email, fullname, username },
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async (
  currentRefreshToken: string | undefined
) => {
  if (!currentRefreshToken) throw new HttpError(401, "RefreshToken not found");
  jwt.verify(currentRefreshToken, JWT_SECRET);

  const session = await Session.findOne({
    where: { refreshToken: currentRefreshToken },
    include: { model: User, as: "user" },
  });
  if (!session) throw new HttpError(401, "Session not found");

  const { user } = session.toJSON();
  if (!user) throw new HttpError(401, "User not found");
  const { id, email, fullname, username } = user;

  const { accessToken, refreshToken } = createTokens({ email });

  await session.update({ accessToken, refreshToken });

  return {
    user: { id, email, fullname, username },
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (user: any) => {
  await Session.destroy({ where: { userId: user.id } });
};

export const deleteUser = async (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

  const verifyEmail = {
    to: email,
    subject: "Confirm account delete",
    html: `<a href="${BASE_URL}/api/auth/delete-confirm?token=${token}" target="_blank">Confirm account delete</a>`,
  };

  await sendEmail(verifyEmail);
};

export const confirmDeleteUser = async (token: any) => {
  const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
  let email: string;
  if (typeof decoded === "object" && "email" in decoded) {
    email = decoded.email;
  } else {
    throw new HttpError(401, "Invalid token payload");
  }
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await user.destroy();
};

export const updateUserPassword = async (userId: number, password: string) => {
  const passwordHash = hashPassword(password);
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Session, as: "sessions" },
  });
  if (!user) throw new HttpError(404, "User not found");
  user?.update({ password: passwordHash });
  const { id, email, fullname, username, sessions } = user?.toJSON();

  const { accessToken, refreshToken } = createTokens({ email });
  sessions.update({ accessToken, refreshToken });

  return {
    user: {
      id,
      email,
      fullname,
      username,
    },
    accessToken,
    refreshToken,
  };
};

export const resetUserPassword = async (email: string) => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) throw new HttpError(404, "User not found");

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/reset-password?token=${token}" target="_blank">Confirm reset password</a>`,
  };
  await sendEmail(verifyEmail);
};

export const confirmResetPassword = async (token: any, password: string) => {
  const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
  let email: string;
  if (typeof decoded === "object" && "email" in decoded) {
    email = decoded.email;
  } else {
    throw new HttpError(401, "Invalid token payload");
  }
  const user = await User.findOne({
    where: {
      email,
    },
    include: { model: Session, as: "sessions" },
  });
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const passwordHash = hashPassword(password);
  await user.update({ password: passwordHash });

  const { id, fullname, username, sessions } = user?.toJSON();
  const { accessToken, refreshToken } = createTokens({ email });
  sessions.update({ accessToken, refreshToken });

  return {
    user: {
      id,
      email,
      fullname,
      username,
    },
    accessToken,
    refreshToken,
  };
};
