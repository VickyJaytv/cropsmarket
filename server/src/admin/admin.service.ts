import { number } from "zod";
import { UserRepository } from "./../repositories/user.repository.js";
export const getUsersService = async (page: number, limit: number) => {
  const [users, total] = await UserRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: {
      createdAt: "DESC",
    },
  });

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getUserByIdService = async (userId: number) => {
  const user = await UserRepository.findOneOrFail({
    where: { id: userId },
    relations: {
      buyerProfile: true,
      farmerProfile: true,
    },
  });

  return user;
};
