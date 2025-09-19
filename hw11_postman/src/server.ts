import express from "express";
import cors from "cors";

let products = [
  { id: 1, name: "Product One", price: 29.99 },
  { id: 2, name: "Product Two", price: 49.99 },
];

const startServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post("/api/products", (req, res) => {
    const newProduct = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  const port: number = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`--- Server start on port ${port} ---`));
};

export default startServer;
