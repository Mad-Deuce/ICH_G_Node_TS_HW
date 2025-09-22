import Publisher from "../db/models/Publisher";

export const getPublisher = async () => {
  const publishers = await Publisher.find();
  return publishers;
};

export const addPublisher = async (payload: any) => {
  const publisher = await Publisher.create(payload);
  return publisher;
};
