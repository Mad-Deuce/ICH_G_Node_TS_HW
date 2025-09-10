import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
