import jwt from "jsonwebtoken";

const {
  JWT_SECRET = "secret",
  ACCESS_TOKEN_MAX_AGE_MS = 900000,
  REFRESH_TOKEN_MAX_AGE_MS = 604800000,
} = process.env;

const createTokens = (payload: any) => {
  const accessToken = jwt.sign({ payload }, JWT_SECRET, {
    expiresIn: Number(ACCESS_TOKEN_MAX_AGE_MS),
  });
  const refreshToken = jwt.sign({ payload }, JWT_SECRET, {
    expiresIn: Number(REFRESH_TOKEN_MAX_AGE_MS),
  });

  return { accessToken, refreshToken };
};

export default createTokens;
