import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, unique: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
  },
  { versionKey: false, timestamps: true }
);

const Article = model("article", schema);

export default Article;
