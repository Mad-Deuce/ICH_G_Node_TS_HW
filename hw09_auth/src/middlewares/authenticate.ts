import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

import HttpError from "../utils/HttpError";

import Session from "../db/models/Session";
import User from "../db/models/User";

const { JWT_SECRET = "secret" } = process.env;

const authenticate = async (req: Request, res: Response, next: any) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw new HttpError(401, "accessToken not found");
  jwt.verify(accessToken, JWT_SECRET);

  const session = await Session.findOne({
    where: { accessToken: accessToken },
    include: { model: User, as: "user" },
  });
  if (!session) throw new HttpError(401, "session not found");
  const { user } = session.toJSON();
  if (!user.mustChangePassword) throw new HttpError(403, "Password update required");
  req.user = user;
  next();
};

export default authenticate;
