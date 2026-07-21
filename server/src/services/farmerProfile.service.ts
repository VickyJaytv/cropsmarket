import { QueryFailedError } from "typeorm";
import {
  FarmerProfileDTO,
  UpdateFarmerProfileDTO,
} from "../schema/farmer.schema.js";
import { FarmerProfileRepository } from "../repositories/farmerProfile.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";
import { Role } from "../enums/enums.js";

export const createFarmerProfileService = async (
  userId: number,
  createData: FarmerProfileDTO,
) => {
  try {
    const user = await UserRepository.findOneByOrFail({
      id: userId,
      role: Role.FARMER,
    });

    const farmerProfile = FarmerProfileRepository.create({
      ...createData,
      user,
    });
    await FarmerProfileRepository.save(farmerProfile);
    return farmerProfile;
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const driverError = (
        error as QueryFailedError & {
          driverError?: { errno?: number };
        }
      ).driverError;

      if (driverError?.errno === 1062) {
        throw new AppError("Unable to create farmer profile.", 400);
      }
    }
    throw error;
  }
};
export const getFarmerProfileService = async (userId: number) => {
  const personalProfile = await FarmerProfileRepository.findOneOrFail({
    where: { user: { id: userId } },
  });
  return personalProfile;
};
export const updateFarmerProfileService = async (
  userId: number,
  updateData: UpdateFarmerProfileDTO,
) => {
  const farmer = await FarmerProfileRepository.findOneByOrFail({
    user: { id: userId },
  });

  Object.assign(farmer, updateData);

  return await FarmerProfileRepository.save(farmer);
};
