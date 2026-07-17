import { Request, Response, NextFunction } from "express";
import { buyerSchema } from "./../schema/buyer.schema.js";
import { createBuyerProfileService } from "@/services/buyerProfile.service.js";
import { AuthenticatedRequest } from "@/middleware/auth.middleware.js";
export const createBuyerProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validateData = buyerSchema.parse(req.body);
    const userId = Number(req.user?.id);
    const buyerProfile = await createBuyerProfileService(userId, validateData);
    return res.status(201).json({
      success: true,
      message: "profile created successfully",
      data: buyerProfile,
    });
  } catch (error) {
    next(error);
  }
};
