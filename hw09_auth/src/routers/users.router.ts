import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import validateBody from "../decorators/validateBody";
import {
  passwordSchema,
  updateSchema,
} from "../validation/schemas/auth.schemas";

import {
  deleteController,
  confirmDeleteController,
  updatePasswordController,
  updateUserPublicDataController,
} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.delete("/delete", authenticate, deleteController);
usersRouter.get("/delete", confirmDeleteController);

usersRouter.put(
  "/update-password",
  authenticate,
  validateBody(passwordSchema),
  updatePasswordController
);
usersRouter.put(
  "/update",
  authenticate,
  validateBody(updateSchema),
  updateUserPublicDataController
);

export default usersRouter;
