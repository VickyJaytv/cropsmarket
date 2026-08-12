import express, { Router } from "express";
import { authorize } from "../middleware/role.middleware.js";
import { checkAuth, adminOnly } from "../middleware/auth.middleware.js";
import {
  deleteProductController,
  getProductByIdController,
  getProductController,
  toggleProductStatusController,
  updateProductController,
} from "../controllers/product.controller.js";
import { Role } from "../enums/enums.js";
import { uploadProductImage } from "../middleware/upload.middleware.js";
import { createListingController } from "../controllers/listing.controller.js";

export const productRoutes: Router = express.Router();

productRoutes.post(
  "/:productId/listing",
  checkAuth,
  authorize(Role.FARMER),
  createListingController,
);
productRoutes.get("/", getProductController);
productRoutes.get("/:productId", getProductByIdController);

productRoutes.patch(
  "/:id",
  checkAuth,
  adminOnly,
  uploadProductImage,
  updateProductController,
);

productRoutes.patch(
  "/:id/toggle-status",
  checkAuth,
  adminOnly,
  toggleProductStatusController,
);

productRoutes.delete("/:id", checkAuth, adminOnly, deleteProductController);
