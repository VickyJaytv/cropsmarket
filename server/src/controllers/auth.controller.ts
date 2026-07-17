import { AppError } from "../utils/AppError.js";
import { signUpSchema } from "../schema/auth.schema.js";
import type { Request, Response, NextFunction } from "express";
import { logoutService, SignUpService } from "../services/auth.service.js";
import { logger } from "./../config/logger.js";
import { AuthenticatedRequest } from "./../middleware/auth.middleware.js";
import { success } from "zod";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = signUpSchema.parse(req.body);
    const { firstName, lastName, email, phoneNumber, password, role } =
      validateData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
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

export const logoutController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    await logoutService(userId);
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success: true, message: "logged out successfully" });
  } catch (error) {
    next(error);
  }
};
