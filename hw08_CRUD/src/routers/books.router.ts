import { Router } from "express";

import {
  getAllBooksController,
  addSingleBookController,
  updateBookByIdController,
  deleteBookByIdController
} from "../controllers/books.controller";

import { bookAddSchema, bookUpdateSchema } from "../schemas/book.schema";
import validateBody from "../decorators/validateBody";

const booksRouter = Router();

booksRouter.get("/", getAllBooksController);
booksRouter.post("/", validateBody(bookAddSchema), addSingleBookController);
booksRouter.put("/:id", validateBody(bookUpdateSchema), updateBookByIdController);
booksRouter.delete("/:id",  deleteBookByIdController);

export default booksRouter;
