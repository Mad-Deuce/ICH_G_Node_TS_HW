import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import checkConfirmationByEmail from "../middlewares/checkConfirmationByEmail";

import validateBody from "../decorators/validateBody";
import { updateSchema } from "../validation/schemas/auth.schemas";
import { emailSchema } from "../validation/schemas/user.schemas";

import {
  deleteController,
  confirmDeleteController,
  updatePublicDataController,
  updateEmailController,
  confirmUpdateEmailController,
  saveNewEmailController,
} from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.delete("/delete", authenticate, deleteController);
usersRouter.get("/delete", checkConfirmationByEmail, confirmDeleteController);

usersRouter.put(
  "/",
  authenticate,
  validateBody(updateSchema),
  updatePublicDataController
);

usersRouter.put(
  "/email",
  authenticate,
  validateBody(emailSchema),
  updateEmailController
);

usersRouter.get(
  "/email",
  checkConfirmationByEmail,
  confirmUpdateEmailController
);
usersRouter.get("/new-email", checkConfirmationByEmail, saveNewEmailController);

export default usersRouter;
