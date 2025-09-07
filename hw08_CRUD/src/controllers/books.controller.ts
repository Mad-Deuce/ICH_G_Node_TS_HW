import { Request, Response } from "express";

import { getAllBooks, addSingleBook } from "../services/books.service";

export const getAllBooksController = async (req: Request, res: Response) => {
  const result = await getAllBooks();
  res.status(200).json(result);
};

export const addSingleBookController = async (req: Request, res: Response) => {
  const result = await addSingleBook(req.body);
  res.status(201).json(result);
};
