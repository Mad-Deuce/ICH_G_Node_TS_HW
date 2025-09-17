import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../utils/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createTokens from "../utils/createTokens";

import User from "../db/models/User";
import Session from "../db/models/Session";
import Role from "../db/models/Role";

const { BASE_URL, FRONTEND_BASE_URL, JWT_SECRET = "secret" } = process.env;

export const getAllUsers = async () => {
  return await User.findAll({
    include: [
      { model: Role, as: "role" },
      { model: Session, as: "session" },
    ],
  });
};

export const deleteUserByEmail = async (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });
  //
  const verifyEmail = {
    to: email,
    subject: "Confirm account delete",
    html: `<a href="${BASE_URL}/api/auth/delete?token=${token}" target="_blank">Confirm account delete</a>`,
  };

  await sendEmail(verifyEmail);
};

export const confirmDeleteUser = async (token: any) => {
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
    await user.destroy();
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export const updateUserPublicData = async (
  userId: number,
  newUserData: any
) => {
  if (newUserData.password) {
    newUserData.password = await hashPassword(newUserData.password);
  }
  const passwordHash = await hashPassword(newUserData.password);
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Session, as: "session" },
  });
  if (!user) throw new HttpError(404, "User not found");

  if (await comparePassword(newUserData.password, String(user.get("password"))))
    throw new HttpError(401, "Old and new passwords must not match");

  delete newUserData.email;
  delete newUserData.roleId;
  await user.update({ ...newUserData });

  const { id, email, fullname, username } = user.toJSON();
  const session: any = user.get("session");

  const { accessToken, refreshToken } = createTokens({ email });
  session.update({ accessToken, refreshToken });

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
