import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";

import { HttpError } from "../utils/HttpError";

const errorHandler = (error: any, req: Request, res: Response, next: any) => {
//   console.log("-----error: ", Reflect.ownKeys(error));
//   console.log("-----error.original: ", Reflect.ownKeys(error.original));
//   console.log("-----original: ", error.original);
//   console.log("-----original.message: ", error.original.message);
//   console.log("-----parent: ", error.parent);
//   console.log("-----sql: ", error.sql);
//   console.log("-----name: ", error.name);
  let status = error.status || 500;
  let message = error.message || "Server error";

  if (error instanceof HttpError) {
    status = 400;
  }

  if (error instanceof UniqueConstraintError) {
    status = 409;
    message = error.original.message;
  }

  res.status(status).json({ message });
};

export default errorHandler;
