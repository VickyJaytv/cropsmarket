import type { Router } from "express";
import express from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controller.js";
export const authRoutes: Router = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login",loginController);
// authRoutes.post("/logout", signupController);
