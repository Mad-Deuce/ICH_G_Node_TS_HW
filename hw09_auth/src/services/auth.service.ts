import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../utils/HttpError";
import sendEmail from "../utils/sendEmail";

import User from "../db/models/User";

const { BASE_URL, JWT_SECRET = "secret" } = process.env;

export const signupUser = async (payload: any) => {
  const { password, email } = payload;
  const passwordHash = await bcrypt.hash(password, 10);
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
