import { Router } from "express";

import validateBody from "../decorators/validateBody";
import { signupSchema, loginSchema } from "../validation/schemas/auth.schemas";
import authenticate from "../middlewares/authenticate";

import {
  signupController,
  emailConfirmController,
  loginController,
  refreshController,
  logoutController,
  deleteController,
  confirmDeleteController,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateBody(signupSchema), signupController);
authRouter.get("/email-confirm", emailConfirmController);

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.get("/refresh", refreshController);
authRouter.get("/logout", authenticate, logoutController);

authRouter.delete("/delete", authenticate, deleteController);
authRouter.get("/delete-confirm", confirmDeleteController);

export default authRouter;
