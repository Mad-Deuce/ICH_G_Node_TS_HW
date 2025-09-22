import Article from "../db/models/Article";
import Tag from "../db/models/Tag";

export const getArticles = async () => {
  const articles = await Article.find().populate("tags");
  return articles;
};

export const addArticles = async (payload: any) => {
  const article = await Article.create(payload);
  return article;
};
