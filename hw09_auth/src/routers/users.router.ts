import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import checkConfirmationByEmail from "../middlewares/checkConfirmationByEmail";

import validateBody from "../decorators/validateBody";
import {
  updateSchema,
} from "../validation/schemas/auth.schemas";

import {
  deleteController,
  confirmDeleteController,
  updateUserPublicDataController,
} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.delete("/delete", authenticate, deleteController);
usersRouter.get("/delete", checkConfirmationByEmail, confirmDeleteController);

usersRouter.put(
  "/",
  authenticate,
  validateBody(updateSchema),
  updateUserPublicDataController
);

usersRouter.put(
  "/email",
  authenticate,
  validateBody(updateSchema),
  updateUserPublicDataController
);

export default usersRouter;
