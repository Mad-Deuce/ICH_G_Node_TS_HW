import { Router } from "express";

import { postController, getController } from "../controllers/main.controller";

const authRouter: Router = Router();

authRouter.get("/", getController);
authRouter.post("/", postController);

export default authRouter;
