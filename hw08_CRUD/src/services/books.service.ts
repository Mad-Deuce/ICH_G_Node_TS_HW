import Book from "../db/models/Book";

export const getAllBooks = async () => {
  const books = await Book.findAll();
  return books;
};

export const addSingleBook = async (payload: any) => {
  const book = await Book.create(payload);
  return book;
};

export const updateBookById = async (id: number, payload: any) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  await book.update(payload);
  return book;
};

export const deleteBookById = async (id: number) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  await book.destroy();
  return book;
};
