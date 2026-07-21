import { QueryFailedError } from "typeorm";
import {
  BuyerProfileDTO,
  UpdateBuyerProfileDTO,
} from "../schema/buyer.schema.js";
import { BuyerProfileRepository } from "../repositories/buyerProfile.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";
import { Role } from "../enums/enums.js";

export const createBuyerProfileService = async (
  userId: number,
  createData: BuyerProfileDTO,
) => {
  try {
    const user = await UserRepository.findOneByOrFail({
      id: userId,
      role: Role.BUYER,
    });

    const buyerProfile = BuyerProfileRepository.create({
      ...createData,
      user,
    });
    await BuyerProfileRepository.save(buyerProfile);
    return buyerProfile;
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const driverError = (
        error as QueryFailedError & {
          driverError?: { errno?: number };
        }
      ).driverError;

      if (driverError?.errno === 1062) {
        throw new AppError("Unable to create buyer profile.", 400);
      }
    }
    throw error;
  }
};
export const getBuyerProfileService = async (userId: number) => {
  const personalProfile = await BuyerProfileRepository.findOneOrFail({
    where: { user: { id: userId } },
    relations: {
      user: true,
    },
  });
  return { ...personalProfile.user, profile: { personalProfile } };
};
export const updateBuyerProfileService = async (
  userId: number,
  updateData: UpdateBuyerProfileDTO,
) => {
  const buyer = await BuyerProfileRepository.findOneByOrFail({
    user: { id: userId },
  });

  Object.assign(buyer, updateData);

  return await BuyerProfileRepository.save(buyer);
};
