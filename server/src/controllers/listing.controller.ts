import { Response, NextFunction } from "express";
import {
  listingFilterSchema,
  listingSchema,
} from "../schema/listing.schema.js";
import { AppError } from "../utils/AppError.js";
import {
  createListingService,
  deleteListingService,
  getAllListingsService,
  getListingByIdService,
  getPersonalListingsService,
  searchListingService,
  updateListingService,
} from "../services/listing.service.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { Role } from "../enums/enums.js";

export const createListingController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const productId = Number(req.params.productId);
  if (Number.isNaN(productId) || productId <= 0) {
    throw new AppError("Invalid Category", 400);
  }
  const validateData = listingSchema.parse(req.body);
  const listingData = {
    ...validateData,
    ...(req.file && {
      image: `/uploads/listing/${req.file.filename}`,
    }),
  };
  try {
    const listing = await createListingService(productId, listingData);
    res.status(201).json({
      success: true,
      message: "listing successfully created",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

export const getPersonalListingController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.user?.id);

    const page = Math.max(Number(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

    const statusValue =
      typeof req.query.status === "string" &&
      (req.query.status === "active" ||
        req.query.status === "sold" ||
        req.query.status === "paused")
        ? req.query.status
        : undefined;

    const filters: {
      name?: string;
      status?: "active" | "sold" | "paused";
      minPrice?: number;
      maxPrice?: number;
      minQuantity?: number;
      maxQuantity?: number;
    } = {
      name:
        typeof req.query.name === "string" ? req.query.name.trim() : undefined,

      status: statusValue,

      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,

      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,

      minQuantity: req.query.minQuantity
        ? Number(req.query.minQuantity)
        : undefined,

      maxQuantity: req.query.maxQuantity
        ? Number(req.query.maxQuantity)
        : undefined,
    };

    const listings = await getPersonalListingsService(
      page,
      limit,
      userId,
      filters,
    );

    res.status(200).json({
      success: true,
      message: "Listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

export const getListingByIdController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = Number(req.params.listingId);

    if (Number.isNaN(listingId) || listingId <= 0) {
      throw new AppError("Invalid listing ID.", 400);
    }

    const listing = await getListingByIdService(listingId);

    return res.status(200).json({
      success: true,
      message: "Listing fetched successfully",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllListingsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = listingFilterSchema.parse(req.query);

    if (
      parsed.minPrice !== undefined &&
      parsed.maxPrice !== undefined &&
      parsed.minPrice > parsed.maxPrice
    ) {
      throw new AppError("minPrice cannot be greater than maxPrice.", 400);
    }

    if (
      parsed.minQuantity !== undefined &&
      parsed.maxQuantity !== undefined &&
      parsed.minQuantity > parsed.maxQuantity
    ) {
      throw new AppError(
        "minQuantity cannot be greater than maxQuantity.",
        400,
      );
    }

    const listings = await getAllListingsService(parsed.page, parsed.limit, {
      ...parsed,
      page: parsed.page,
      limit: parsed.limit,
    });

    return res.status(200).json({
      success: true,
      message: "Listings fetched successfully",
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateListingController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = Number(req.params.listingId);

    if (Number.isNaN(listingId) || listingId <= 0) {
      throw new AppError("Invalid listing ID.", 400);
    }

    const validateData = listingSchema.partial().parse(req.body);

    const listing = await updateListingService(
      listingId,
      validateData,
      req.user?.id,
      req.user?.role === Role.ADMIN,
    );

    return res.status(200).json({
      success: true,
      message: "listing updated successfully",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListingController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = Number(req.params.listingId);

    if (Number.isNaN(listingId) || listingId <= 0) {
      throw new AppError("Invalid listing ID.", 400);
    }

    const listing = await deleteListingService(
      listingId,
      req.user?.id,
      req.user?.role === Role.ADMIN,
    );

    return res.status(200).json({
      success: true,
      message: "listing deleted successfully",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};
