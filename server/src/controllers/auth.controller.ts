import { AppError } from "../utils/AppError.js";
import { loginSchema, signUpSchema } from "../schema/auth.schema.js";
import type { Request, Response, NextFunction } from "express";
import {
  LoginService,
  logoutService,
  SignUpService,
} from "../services/auth.service.js";
import { logger } from "./../config/logger.js";
import { AuthenticatedRequest } from "./../middleware/auth.middleware.js";
import { generateTokenAndCookies } from "../utils/cookies.js";
import { PublicUserInterface } from "@/interfaces/user.interface.js";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = signUpSchema.parse(req.body);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role,
      accountType,
    } = validateData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !accountType ||
      !role
    ) {
      throw new AppError("fill in all required fields", 400);
    }
    const user = await SignUpService({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      accountType,
      role,
    });
    res.status(201).json({
      success: true,
      message: "user signed up successfully",
      data: user,
    });
  } catch (error) {
    next(error);
    logger.error(error);
  }
};
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = loginSchema.parse(req.body);
    const user: PublicUserInterface = await LoginService(validateData);
    generateTokenAndCookies(res, user.id.toString());
    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: user,
    });
  } catch (error) {
    next(error);
    logger.error(error);
  }
};

// export const logoutController = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const userId = req.user.id;
//     await logoutService(userId);
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });
//     res.status(200).json({ success: true, message: "logged out successfully" });
//   } catch (error) {
//     next(error);
//   }
// };
