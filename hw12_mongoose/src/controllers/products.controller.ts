import { Request, Response } from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/products.service";

export const addProductController = async (req: Request, res: Response) => {
  const product = await addProduct(req.body);
  res.status(201).json(product);
};

export const getAllProductsController = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.status(200).json(products);
};

export const getProductsByIdController = async (
  req: Request,
  res: Response
) => {
  const product = await getProductById(req.params.id);
  res.status(200).json(product);
};

export const updateProductController = async (req: Request, res: Response) => {
  const product = await updateProduct(req.params.id, req.body);
  res.status(201).json(product);
};

export const deleteProductController = async (req: Request, res: Response) => {
  const product = await deleteProduct(req.params.id);
  res.status(200).json(product);
};
