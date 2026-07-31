import { Request, Response, NextFunction } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  searchCategoryService,
  updateCategoryService,
} from "./../services/category.service.js";
import { categorySchema } from "./../schema/category.schema.js";
import { AuthenticatedRequest } from "./../middleware/auth.middleware.js";

export const createCategoryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = categorySchema.parse(req.body);

    const category = await createCategoryService(validateData);
    return res.status(201).json({
      success: true,
      message: "category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const q = req.query;
    if (typeof q !== "string") {
      return res.status(400).json({
        message: "Search query is required",
      });
    }
    const category = q
      ? await searchCategoryService(q as string)
      : await getAllCategoriesService();
    return res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await getCategoryByIdService(categoryId);
    return res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = categorySchema.parse(req.body);
    const categoryId = Number(req.params.id);
    const category = await updateCategoryService(categoryId, validateData);
    return res.status(201).json({
      success: true,
      message: "category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCategoryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await deleteCategoryService(categoryId);
    return res.status(201).json({
      success: true,
      message: "category deleted successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
