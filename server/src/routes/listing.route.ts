import express, { Router } from "express";
import { authorize } from "../middleware/role.middleware.js";
import { checkAuth } from "../middleware/auth.middleware.js";
import { Role } from "../enums/enums.js";
import {
  deleteListingController,
  getAllListingsController,
  getListingByIdController,
  getPersonalListingController,
  updateListingController,
} from "../controllers/listing.controller.js";

export const listingRoutes: Router = express.Router();

listingRoutes.get("/", getAllListingsController);
listingRoutes.get(
  "/personal",
  checkAuth,
  authorize(Role.FARMER),
  getPersonalListingController,
);
listingRoutes.get("/:listingId", getListingByIdController);
listingRoutes.patch(
  "/:listingId",
  checkAuth,
  authorize(Role.FARMER, Role.ADMIN),
  updateListingController,
);
listingRoutes.delete(
  "/:listingId",
  checkAuth,
  authorize(Role.FARMER, Role.ADMIN),
  deleteListingController,
);
