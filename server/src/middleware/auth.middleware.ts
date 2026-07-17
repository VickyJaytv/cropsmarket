import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { UserInterface } from "./../interfaces/user.interface.js";
import { AppError } from "@/utils/AppError.js";
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
    const verify = jwt.verify(token, process.env.JWT_SECRET || "") as {
      userId: string;
    };
    if (!verify) {
      throw new AppError("unauthorized invalid or expired token", 401);
    }
    const user = await UserRepository.findOneBy({ id: Number(verify.userId) });
    if (!user) {
      throw new AppError("user not found", 401);
    }
    req.user = user as unknown as UserInterface;
    next();
  } catch (error) {
    next(error);
  }
};
