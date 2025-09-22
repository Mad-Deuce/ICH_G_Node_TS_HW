import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    issueNumber: { type: Number, required: true },
    publisher: { type: Schema.Types.ObjectId, ref: "publisher" },
  },
  { versionKey: false, timestamps: true }
);

const Magazine = model("magazine", schema);

export default Magazine;
