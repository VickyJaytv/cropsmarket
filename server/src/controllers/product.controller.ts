import { AppError } from "../utils/AppError.js";
import {
  FilterProductDTO,
  productSchema,
  updateProductSchema,
} from "../schema/product.schema.js";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductService,
  searchProductService,
  toggleProductStatusService,
  updateProductService,
} from "../services/product.service.js";
import { Request, Response, NextFunction } from "express";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryId = Number(req.params.categoryId);
  if (Number.isNaN(categoryId) || categoryId <= 0) {
    throw new AppError("Invalid category ID.", 400);
  }
  const validateData = productSchema.parse(req.body);
  const productData = {
    ...validateData,
    ...(req.file && {
      image: `/uploads/products/${req.file.filename}`,
    }),
  };
  try {
    const product = await createProductService(categoryId, productData);
    res.status(201).json({
      success: true,
      message: "product successfully created",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const q = typeof req.query.q === "string" ? req.query.q.trim() : undefined;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    const statusValue =
      typeof req.query.status === "string" &&
      (req.query.status === "active" || req.query.status === "inactive")
        ? req.query.status
        : undefined;

    const filters: Partial<FilterProductDTO> = {
      name:
        typeof req.query.name === "string" ? req.query.name.trim() : undefined,
      categoryId:
        req.query.categoryId !== undefined && req.query.categoryId !== ""
          ? Number(req.query.categoryId)
          : undefined,
      status: statusValue,
      isActive:
        req.query.isActive === undefined
          ? undefined
          : String(req.query.isActive).toLowerCase() === "true",
    };

    if (
      filters.categoryId !== undefined &&
      (Number.isNaN(filters.categoryId) || filters.categoryId <= 0)
    ) {
      throw new AppError("Invalid category ID.", 400);
    }

    if (q) {
      const products = await searchProductService(q, {
        ...filters,
        name: filters.name || q,
      });

      return res.status(200).json({
        success: true,
        message: "products successfully fetched",
        data: products,
      });
    }

    const products = await getProductService(page, limit, filters);

    return res.status(200).json({
      success: true,
      message: "products successfully fetched",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.productId);

    if (Number.isNaN(productId) || productId <= 0) {
      throw new AppError("Invalid product ID.", 400);
    }

    const product = await getProductByIdService(productId);

    return res.status(200).json({
      success: true,
      message: "product fetched successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.id);
    if (Number.isNaN(productId) || productId <= 0) {
      throw new AppError("Invalid product ID.", 400);
    }
    const validateData = updateProductSchema.parse(req.body);
    const productData = {
      ...validateData,
      ...(req.file && {
        image: `/uploads/products/${req.file.filename}`,
      }),
    };
    const product = await updateProductService(productId, productData);
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.id);
    if (Number.isNaN(productId) || productId <= 0) {
      throw new AppError("Invalid product ID.", 400);
    }
    const product = await deleteProductService(productId);
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleProductStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.id);
    if (Number.isNaN(productId) || productId <= 0) {
      throw new AppError("Invalid product ID.", 400);
    }
    const product = await toggleProductStatusService(productId);
    const statusMessage = product.isActive
      ? "product enabled successfully"
      : "product disabled successfully";
    return res.status(200).json({
      success: true,
      message: statusMessage,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
