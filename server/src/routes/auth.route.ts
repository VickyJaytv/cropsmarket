import type { Router } from "express";
import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/auth.middleware.js";

export const authRoutes: Router = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);
authRoutes.post("/logout", checkAuth, logoutController);
