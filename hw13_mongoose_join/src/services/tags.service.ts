import Tag from "../db/models/Tag";

export const getTags = async () => {
  const tags = await Tag.find().populate("articles");
  return tags;
};

export const addTag = async (payload: any) => {
  const tag = await Tag.create(payload);
  return tag;
};
