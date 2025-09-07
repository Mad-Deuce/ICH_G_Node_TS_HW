import Book from "../db/models/Book";

export const getAllBooks = async () => {
  const books = await Book.findAll();
  return books;
};

export const addSingleBook = async (payload: any) => {
  const book = await Book.create(payload);
  return book;
};
