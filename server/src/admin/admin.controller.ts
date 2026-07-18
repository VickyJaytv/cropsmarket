import { Request, Response, NextFunction } from "express";
import { getUserByIdService, getUsersService } from "./admin.service.js";
import { number } from "zod";

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Controller reached");
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const users = await getUsersService(page, limit);

    return res.status(200).json({
      success: true,
      message: "users fetched successfully",
      ...users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(Number(id));
    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
