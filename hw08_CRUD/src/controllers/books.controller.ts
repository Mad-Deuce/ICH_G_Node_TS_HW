import { Request, Response } from "express";

import {
  getAllBooks,
  addSingleBook,
  updateBookById,
  deleteBookById
} from "../services/books.service";

export const getAllBooksController = async (req: Request, res: Response) => {
  const result = await getAllBooks();
  res.status(200).json(result);
};

export const addSingleBookController = async (req: Request, res: Response) => {
  const result = await addSingleBook(req.body);
  res.status(201).json(result);
};

export const updateBookByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await updateBookById(Number(id), payload);
  res.status(201).json(result);
};

export const deleteBookByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteBookById(Number(id));
  res.status(204).json(result);
};