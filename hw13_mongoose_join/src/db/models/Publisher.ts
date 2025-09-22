import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const Publisher = model("publisher", schema);

export default Publisher;
