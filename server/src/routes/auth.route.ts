import type { Router } from "express";
import express from "express";
import { signupController } from "../controllers/auth.controller.js";
export const authRoutes: Router = express.Router();

authRoutes.post("/signup", signupController);
// authRoutes.post("/login");
// authRoutes.post("/logout", signupController);
