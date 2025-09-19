import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Product = model("product", schema);

export default Product;
