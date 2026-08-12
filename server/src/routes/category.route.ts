import type { Router } from "express";
import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import { adminOnly, checkAuth } from "../middleware/auth.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import { uploadProductImage } from "../middleware/upload.middleware.js";
export const categoryRoutes: Router = express.Router();

categoryRoutes.post("/", checkAuth, adminOnly, createCategoryController);
categoryRoutes.post(
  "/:categoryId/products",
  checkAuth,
  adminOnly,
  uploadProductImage,
  createProductController,
);
categoryRoutes.get("/", getAllCategoriesController);
categoryRoutes.patch("/:id", checkAuth, adminOnly, updateCategoryController);
categoryRoutes.delete("/:id", checkAuth, adminOnly, deleteCategoryController);
