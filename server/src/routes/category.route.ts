import type { Router } from "express";
import express from "express";
import { createCategoryController } from "../controllers/category.controller.js";
export const categoryRoutes: Router = express.Router();

categoryRoutes.post("/", createCategoryController);
