import { Router } from "express";

import validateBody from "../decorators/validateBody";
import {
  productAddSchema,
  productUpdateSchema,
} from "../validation/schemas/product.schemas";

import {
  addProductController,
  getAllProductsController,
  getProductsByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.post("/", validateBody(productAddSchema), addProductController);
productsRouter.get("/", getAllProductsController);
productsRouter.get("/:id", getProductsByIdController);
productsRouter.put(
  "/:id",
  validateBody(productUpdateSchema),
  updateProductController
);
productsRouter.delete("/:id", deleteProductController);

export default productsRouter;
