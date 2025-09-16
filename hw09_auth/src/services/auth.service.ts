import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../utils/HttpError";
import sendEmail from "../utils/sendEmail";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import createTokens from "../utils/createTokens";



import User from "../db/models/User";
import Session from "../db/models/Session";
import Role from "../db/models/Role";

const { BASE_URL, FRONTEND_BASE_URL, JWT_SECRET = "secret" } = process.env;

export const signupUser = async (payload: any) => {
  const { password, email } = payload;
  const passwordHash = await hashPassword(password);

  const role = await Role.findOne({ where: { name: "user" } });
  if (!role) throw new HttpError(500, "Role 'user' not found");

  await User.create({
    ...payload,
    roleId: role.get("id"),
    password: passwordHash,
  });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/signup?token=${token}" target="_blank">Confirm email</a>`,
  };

  await sendEmail(verifyEmail);

  return email;
};

export const confirmEmail = async (token: any) => {
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
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export const loginUser = async (email: string, loginPassword: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new HttpError(401, "Email or password invalid");
  const { id, verified, password, fullname, username } = user.toJSON();

  if (!(await comparePassword(loginPassword, password)))
    throw new HttpError(401, "Email or password invalid");

  if (!verified) throw new HttpError(403, "Email not confirmed");

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
  try {
    if (!currentRefreshToken)
      throw new HttpError(401, "RefreshToken not found");
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
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};

export const logoutUser = async (id: number) => {
  await Session.destroy({ where: { userId: id } });
};

export const deleteUser = async (email: string) => {
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

export const updateUserPassword = async (userId: number, password: string) => {
  const passwordHash = hashPassword(password);
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Session, as: "session" },
  });
  if (!user) throw new HttpError(404, "User not found");

  if (await comparePassword(password, String(user.get("password"))))
    throw new HttpError(401, "Old and new passwords must not match");

  user?.update({ password: passwordHash });
  const { id, email, fullname, username } = user?.toJSON();
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

export const resetUserPassword = async (email: any) => {
  const user = await User.findOne({
    where: { email },
  });
  if (!user) throw new HttpError(404, "User not found");

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });

  const verifyEmail = {
    to: email,
    subject: "Confirm reset password",
    html: `<a href="${FRONTEND_BASE_URL}/api/auth/reset-password?token=${token}" target="_blank">Confirm reset password</a>`,
  };
  await sendEmail(verifyEmail);
};

export const confirmResetPassword = async (token: any, newPassword: string) => {
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
      include: { model: Session, as: "session" },
    });
    if (!user) {
      throw new HttpError(404, "User not found");
    }

    if (await comparePassword(newPassword, String(user.get("password"))))
      throw new HttpError(401, "Old and new passwords must not match");

    const passwordHash = await hashPassword(newPassword);
    await user.update({ password: passwordHash });

    const { id, fullname, username } = user?.toJSON();
    const session: any = user.get("session");
    const { accessToken, refreshToken } = createTokens({ email });
    session.update({ accessToken, refreshToken });

    return {
      user: { id, email, fullname, username },
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new HttpError(401, error.message);
  }
};
