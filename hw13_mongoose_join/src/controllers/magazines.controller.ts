import { Request, Response } from "express";

import { getMagazines, addMagazine } from "../services/magazines.service";

export const getAllMagazinesController = async (
  req: Request,
  res: Response
) => {
  const magazines = await getMagazines();
  res.status(200).json(magazines);
};

export const addMagazineController = async (
  req: Request,
  res: Response
) => {
  const magazine = await addMagazine(req.body);
  res.status(201).json(magazine);
};