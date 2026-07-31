import { productSchema } from "../schema/product.schema.js";
import {
  createProductService,
  getProductService,
  searchProductService,
} from "../services/product.service.js";
import { Request, Response, NextFunction } from "express";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateData = productSchema.parse(req.body);
  const productData = {
    ...validateData,
    ...(req.file && {
      productImage: `/uploads/products/${req.file.filename}`,
    }),
  };
  try {
    const product = await createProductService(productData);
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
  const { q } = req.query;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const products =
    typeof q === "string"
      ? await searchProductService(q)
      : await getProductService(page, limit);
};
