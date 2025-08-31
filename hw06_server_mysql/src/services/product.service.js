import Product from "../db/models/Product.js";

export const getProducts = () => Product.findAll();

export const addProduct = (payload) => Product.create(payload);