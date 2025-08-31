import { Router } from "express";

import { getProductsController, addProductController } from "../controllers/product.controller.js";

import validateBody from "../decorators/validateBody.js";

import { productAddSchema } from "../schemas/Product.schemas.js";


const productRouter = Router();

productRouter.get("/", getProductsController);
productRouter.post("/", validateBody(productAddSchema), addProductController);

export default productRouter;