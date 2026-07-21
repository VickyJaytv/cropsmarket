import crypto from "crypto";
import slugify from "slugify";
import { CreateCategoryDTO } from "../schema/category.schema.js";
import { UserRepository } from "./../repositories/user.repository.js";
import { AppError } from "../utils/AppError.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { Role } from "../enums/enums.js";

export const createCategoryService = async (
  adminId: number,
  data: CreateCategoryDTO,
) => {
  const slugNumber = crypto.randomBytes(3).toString("hex");
  const baseSlug = slugify(data.name, { lower: true, trim: true });
  const slug = `${baseSlug}-${slugNumber}`;
  const admin = await UserRepository.findOne({
    where: {
      id: adminId,
      role: Role.ADMIN,
    },
  });
  if (!admin) {
    throw new AppError("unauthorized", 401);
  }

  const newCategory = await CategoryRepository.create({
    ...data,
    slug,
    isActive: true,
  });
  return await CategoryRepository.save(newCategory);
};

export const getCategoryService = async () => {
  const newCategory = await CategoryRepository.find();

  return newCategory;
};
