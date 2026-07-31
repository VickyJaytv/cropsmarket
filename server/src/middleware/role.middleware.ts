import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./auth.middleware.js";
import { Role } from "../enums/enums.js";
import { AppError } from "../utils/AppError.js";

export const authorize =
  (...roles: Role[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
