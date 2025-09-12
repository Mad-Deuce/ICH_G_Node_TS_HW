import { Router } from "express";

import validateBody from "../decorators/validateBody";
import { signupSchema, loginSchema } from "../validation/schemas/auth.schemas";

import {
  signupController,
  emailConfirmController,
  loginController,
  refreshController,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateBody(signupSchema), signupController);
authRouter.get("/email-confirm", emailConfirmController);

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.get("/refresh", refreshController);

export default authRouter;
