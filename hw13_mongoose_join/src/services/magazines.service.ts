import Magazine from "../db/models/Magazine";

export const getMagazines = async () => {
  const magazines = await Magazine.find().populate('publisher');
  return magazines;
};

export const addMagazine = async (payload: any) => {
  const magazine = await Magazine.create(payload);
  return magazine;
};
