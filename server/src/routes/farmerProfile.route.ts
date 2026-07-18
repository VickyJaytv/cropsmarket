import {
  createFarmerProfileController,
  getPersonalFarmerProfileController,
  updateFarmerProfileController,
} from "../controllers/farmerProfile.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import express, { Router } from "express";
export const farmerProfileRoutes: Router = express.Router();
farmerProfileRoutes.post(
  "/create",
  checkAuth,
  createFarmerProfileController,
  getPersonalFarmerProfileController,
);

farmerProfileRoutes.get("/me", checkAuth, getPersonalFarmerProfileController);

farmerProfileRoutes.patch(
  "/update/me",
  checkAuth,
  updateFarmerProfileController,
);
