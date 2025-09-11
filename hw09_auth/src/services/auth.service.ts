import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../utils/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";

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
  console.log(token);

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/email-confirm?token=${token}" target="_blank">Confirm email</a>`,
  };

  await sendEmail(verifyEmail);

  return newUser;
};

export const emailConfirm = async (token: any) => {
  try {
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
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export const loginUser = async (payload: any) => {
  const { password, email } = payload;

  const user = await User.findOne({ where: { email: email } });
  if (!user) throw new HttpError(401, "Email or password invalid");
  if (!user.get("verified")) throw new HttpError(403, "Email not verified");

  const passwordCompare = comparePassword(
    password,
    String(user.get("password"))
  );

  if (!passwordCompare) throw new HttpError(401, "Email or password invalid");

  await Session.destroy({ where: { userId: user.get("id") } });

  const accessToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: Number(ACCESS_TOKEN_MAX_AGE_MS),
  });
  const refreshToken = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: Number(REFRESH_TOKEN_MAX_AGE_MS),
  });

  await Session.create({
    userId: user.get("id"),
    accessToken,
    refreshToken,
    accessTokenExpired: new Date().getTime() + Number(ACCESS_TOKEN_MAX_AGE_MS),
    refreshTokenExpired:
      new Date().getTime() + Number(REFRESH_TOKEN_MAX_AGE_MS),
  });

  return {
    user: {
      id: user.get("id"),
      email: user.get("email"),
      fullname: user.get("fullname"),
      username: user.get("username"),
    },
    accessToken,
    refreshToken,
  };
};
