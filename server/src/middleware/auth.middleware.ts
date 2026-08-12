import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { UserInterface } from "./../interfaces/user.interface.js";
import { AppError } from "../utils/AppError.js";
import { Role } from "../enums/enums.js";
export interface AuthenticatedRequest extends Request {
  user?: UserInterface;
}
export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new AppError("unauthorized", 401);
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const verify = jwt.verify(token, jwtSecret) as {
      userId: string;
      tokenVersion?: number;
    };
    if (!verify) {
      throw new AppError("unauthorized invalid or expired token", 401);
    }
    const user = await UserRepository.findOneBy({ id: Number(verify.userId) });
    if (!user) {
      throw new AppError("user not found", 401);
    }
    if (
      verify.tokenVersion !== undefined &&
      user.tokenVersion !== undefined &&
      verify.tokenVersion !== user.tokenVersion
    ) {
      throw new AppError("unauthorized invalid or expired token", 401);
    }
    req.user = user as unknown as UserInterface;

    next();
  } catch (error) {
    next(error);
  }
};

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user?.role !== Role.ADMIN) {
      throw new AppError("forbidden", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
