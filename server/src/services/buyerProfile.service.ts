import { QueryFailedError } from "typeorm";
import {
  BuyerProfileDTO,
  UpdateBuyerProfileDTO,
} from "../schema/buyer.schema.js";
import { BuyerProfileRepository } from "../repositories/buyer-profile.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";

export const createBuyerProfileService = async (
  userId: number,
  createData: BuyerProfileDTO,
) => {
  try {
    const user = await UserRepository.findOneByOrFail({
      id: userId,
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
  });
  return personalProfile;
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
