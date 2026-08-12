import { authorize } from "../middleware/role.middleware.js";
import {
  createFarmerProfileController,
  getPersonalFarmerProfileController,
  updateFarmerProfileController,
} from "../controllers/farmerProfile.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import express, { Router } from "express";
import { Role } from "../enums/enums.js";
import { uploadProfilePicture } from "../middleware/upload.middleware.js";
export const farmerProfileRoutes: Router = express.Router();
farmerProfileRoutes.post(
  "/profile",
  checkAuth,
  authorize(Role.FARMER),
  uploadProfilePicture,
  createFarmerProfileController,
);

farmerProfileRoutes.get(
  "/profile",
  checkAuth,
  authorize(Role.FARMER),
  getPersonalFarmerProfileController,
);

farmerProfileRoutes.patch(
  "/profile",
  checkAuth,
  authorize(Role.FARMER),
  uploadProfilePicture,
  updateFarmerProfileController,
);
