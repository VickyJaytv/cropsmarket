import crypto from "crypto";
import slugify from "slugify";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "../schema/category.schema.js";
import { AppError } from "../utils/AppError.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ILike, QueryFailedError } from "typeorm";

export const createCategoryService = async (data: CreateCategoryDTO) => {
  try {
    const slugNumber = crypto.randomBytes(3).toString("hex");
    const baseSlug = slugify(data.name, { lower: true, trim: true });
    const slug = `${baseSlug}-${slugNumber}`;

    const newCategory = await CategoryRepository.create({
      ...data,
      slug,
      isActive: true,
    });
    return await CategoryRepository.save(newCategory);
  } catch (error) {
    if (error instanceof QueryFailedError) {
      const driverError = (
        error as QueryFailedError & {
          driverError?: { errno?: number };
        }
      ).driverError;

      if (driverError?.errno === 1062) {
        throw new AppError("Category already exists.", 409);
      }
    }

    throw error;
  }
};

export const getAllCategoriesService = async () => {
  return await CategoryRepository.find();
};

export const getCategoryByIdService = async (id: number) => {
  return await CategoryRepository.findOneOrFail({ where: { id } });
};

export const searchCategoryService = async (query: string) => {
  return await CategoryRepository.find({
    where: {
      name: ILike(`%${query}%`),
    },
  });
};

export const updateCategoryService = async (
  categoryId: number,
  data: UpdateCategoryDTO,
) => {
  const category = await CategoryRepository.findOneByOrFail({
    id: categoryId,
  });

  Object.assign(category, data);
  return await CategoryRepository.save(category);
};

export const deleteCategoryService = async (categoryId: number) => {
  const category = await CategoryRepository.findOneByOrFail({ id: categoryId });
  return await CategoryRepository.remove(category);
};
