import { Router } from "express";

import validateBody from "../decorators/validateBody";
import { signupSchema } from "../validation/schemas/auth.schemas";

import { signupController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateBody(signupSchema), signupController);

export default authRouter;
