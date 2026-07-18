import {
  createFarmerProfileController,
  getPersonalFarmerProfileController,
  updateFarmerProfileController,
} from "../controllers/farmerProfile.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import express, { Router } from "express";
export const farmerProfileRoutes: Router = express.Router();
farmerProfileRoutes.post(
  "/profile",
  checkAuth,
  createFarmerProfileController,
  getPersonalFarmerProfileController,
);

farmerProfileRoutes.get(
  "/profile",
  checkAuth,
  getPersonalFarmerProfileController,
);

farmerProfileRoutes.patch("/profile", checkAuth, updateFarmerProfileController);
