import express, { Router } from "express";
import { checkAuth, adminOnly } from "../middleware/auth.middleware.js";
import { getUserByIdController, getUsersController } from "./admin.controller.js";
export const adminRoutes: Router = express();

adminRoutes.get("/users", checkAuth, adminOnly, getUsersController);
adminRoutes.get("/user/:id", checkAuth, adminOnly, getUserByIdController);
