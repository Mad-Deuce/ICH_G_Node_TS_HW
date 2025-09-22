import { Schema, model } from "mongoose";

const tagSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    articles: [{ type: Schema.Types.ObjectId, ref: "article" }],
  },
  { versionKey: false, timestamps: true }
);

const Tag = model("tag", tagSchema);

export default Tag;
