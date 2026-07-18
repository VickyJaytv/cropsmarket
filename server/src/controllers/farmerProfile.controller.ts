import { Response, NextFunction } from "express";
import {
  FarmerProfileDTO,
  farmerSchema,
  UpdateFarmerProfileDTO,
  UpdateFarmerSchema,
} from "./../schema/farmer.schema.js";
import {
  createFarmerProfileService,
  getFarmerProfileService,
} from "@/services/farmerProfile.service.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { updateFarmerProfileService } from "./../services/farmerProfile.service.js";

export const createFarmerProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const validateData = farmerSchema.parse(req.body);
  const profileData: FarmerProfileDTO = {
    ...validateData,
    ...(req.file && {
      profilePicture: `/uploads/profiles/${req.file.filename}`,
    }),
  };
  try {
    const userId = Number(req.user?.id);
    const createdFarmerProfile = await createFarmerProfileService(
      userId,
      profileData,
    );
    return res.status(201).json({
      success: true,
      message: "profile created successfully",
      data: createdFarmerProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const getPersonalFarmerProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = await Number(req.user?.id);
    const farmerProfile = await getFarmerProfileService(userId);
    return res.status(200).json({
      success: true,
      message: "profile fetched successfully",
      data: farmerProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFarmerProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const validateData = UpdateFarmerSchema.parse(req.body);
  const profileData: UpdateFarmerProfileDTO = {
    ...validateData,
    ...(req.file && {
      profilePicture: `/uploads/profiles/${req.file.filename}`,
    }),
  };
  try {
    const userId = Number(req.user?.id);
    const updatedFarmerProfile = await updateFarmerProfileService(
      userId,
      profileData,
    );
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      data: updatedFarmerProfile,
    });
  } catch (error) {
    next(error);
  }
};
