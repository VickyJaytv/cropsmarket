import { ZodError } from "zod";
import { AppError } from "./../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";


import { QueryFailedError } from "typeorm";

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
  }
  if (err instanceof QueryFailedError) {
    const driverError = (
      err as QueryFailedError & {
        driverError?: { errno?: number; code?: string };
      }
    ).driverError;

    if (driverError?.errno === 1062) {
      return res.status(409).json({
        success: false,
        message: "Duplicate entry. Resource already exists.",
      });
    }

    if (driverError?.errno === 1451) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete resource with dependent relationships.",
      });
    }
  }

  return res
    .status(500)
    .json({ success: false, message: "internal server error" });
};
