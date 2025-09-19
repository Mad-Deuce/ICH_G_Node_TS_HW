import Product from "../db/models/Product";

import HttpError from "../utils/HttpError";

export const addProduct = async (payload: any) => {
  try {
    const product = await Product.create(payload);
    return product;
  } catch (error: any) {
    throw new HttpError(500, error.message);
  }
};

export const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error: any) {
    throw new HttpError(500, error.message);
  }
};

export const getProductById = async (id: any) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error: any) {
    throw new HttpError(500, error.message);
  }
};

export const updateProduct = async (id: any, payload: any) => {
  try {
    const product = await Product.findByIdAndUpdate(id, payload, { new: true });
    return product;
  } catch (error: any) {
    throw new HttpError(500, error.message);
  }
};

export const deleteProduct = async (id: any) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error: any) {
    throw new HttpError(500, error.message);
  }
};
