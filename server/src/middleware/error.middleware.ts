import { ZodError } from "zod";
import { AppError } from "./../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";


export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.issues.map((e) => e.message),
    });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
