import { createBuyerProfileController } from "../controllers/buyerProfile.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import express, { Router } from "express";
export const buyerProfileRoutes: Router = express.Router();
buyerProfileRoutes.post(
  "/profile",
  checkAuth,
  createBuyerProfileController,
);
