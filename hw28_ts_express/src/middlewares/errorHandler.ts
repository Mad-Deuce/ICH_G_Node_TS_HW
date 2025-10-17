import { Request, Response, NextFunction } from "express";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

  let status = error.status || 500;
  let message = error.message || "Server error";

  res.status(status).json({ message });
};

export default errorHandler;
