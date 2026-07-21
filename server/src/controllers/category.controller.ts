import { Request, Response, NextFunction } from "express";
import { createCategoryService } from "./../services/category.service.js";
import { categorySchema } from "./../schema/category.schema.js";
import { AuthenticatedRequest } from "./../middleware/auth.middleware.js";

export const createCategoryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = categorySchema.parse(req.body);
    const adminId = Number(req.user?.id);
    const category = await createCategoryService(adminId, validateData);
    return res.status(201).json({
      success: true,
      message: "category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
