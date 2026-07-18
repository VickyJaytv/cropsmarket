import { uploadProfilePicture } from "../middleware/upload.middleware.js";
import {
  createBuyerProfileController,
  getPersonalBuyerProfileController,
  updateBuyerProfileController,
} from "../controllers/buyerProfile.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import express, { Router } from "express";
export const buyerProfileRoutes: Router = express.Router();
buyerProfileRoutes.post(
  "/profile",
  checkAuth,
  createBuyerProfileController,
  getPersonalBuyerProfileController,
);

buyerProfileRoutes.get(
  "/profile",
  checkAuth,
  uploadProfilePicture,
  getPersonalBuyerProfileController,
);

buyerProfileRoutes.patch("/profile", checkAuth, updateBuyerProfileController);
