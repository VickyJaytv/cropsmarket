import type { Router } from "express";
import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import { adminOnly, checkAuth } from "@/middleware/auth.middleware.js";
export const categoryRoutes: Router = express.Router();

categoryRoutes.post("/", checkAuth, adminOnly, createCategoryController);
categoryRoutes.patch("/:id", checkAuth, adminOnly, updateCategoryController);
categoryRoutes.delete("/:id", checkAuth, adminOnly, deleteCategoryController);
