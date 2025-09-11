import { Router } from "express";

import { getSessionsController } from "../controllers/sessions.controller";

const sessionsRouter = Router();

sessionsRouter.get("/", getSessionsController);

export default sessionsRouter;
