import { getProducts, addProduct } from "../services/product.service.js";

export const getProductsController = async (req, res) => {
    const products = await getProducts();
    res.status(200).json(products);
};

export const addProductController = async (req, res) => {
    const data = await addProduct(req.body);
    res.status(201).json(data);
};