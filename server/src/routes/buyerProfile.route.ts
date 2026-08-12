import { uploadProfilePicture } from "../middleware/upload.middleware.js";
import {
  createBuyerProfileController,
  getPersonalBuyerProfileController,
  updateBuyerProfileController,
} from "../controllers/buyerProfile.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import express, { Router } from "express";
import { authorize } from "../middleware/role.middleware.js";
import { Role } from "../enums/enums.js";
export const buyerProfileRoutes: Router = express.Router();
buyerProfileRoutes.post(
  "/profile",
  checkAuth,
  authorize(Role.BUYER),
  createBuyerProfileController,
  getPersonalBuyerProfileController,
);

buyerProfileRoutes.get(
  "/profile",
  checkAuth,
  authorize(Role.BUYER),
  uploadProfilePicture,
  getPersonalBuyerProfileController,
);

buyerProfileRoutes.patch(
  "/profile",
  checkAuth,
  authorize(Role.BUYER),
  updateBuyerProfileController,
);
