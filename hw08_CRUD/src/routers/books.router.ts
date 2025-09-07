import { Router } from "express";

import {
  getAllBooksController,
  addSingleBookController,
} from "../controllers/books.controller";

import { bookAddSchema } from "../schemas/book.schema";
import validateBody from "../decorators/validateBody";

const booksRouter = Router();

booksRouter.get("/", getAllBooksController);
booksRouter.post("/", validateBody(bookAddSchema), addSingleBookController);

export default booksRouter;
