import crypto from "crypto";
import slugify from "slugify";
import { ILike, QueryFailedError } from "typeorm";
import { ProductRepository } from "../repositories/product.repository.js";
import { CreateProductDTO } from "../schema/product.schema.js";
import { AppError } from "../utils/AppError.js";

export const createProductService = async (data: CreateProductDTO) => {
  try {
    const slugNumber = crypto.randomBytes(3).toString("hex");
    const baseSlug = slugify(data.name, {
      lower: true,
      trim: true,
    });
    const slug = `${baseSlug}-${slugNumber}`;

    const newProduct = await ProductRepository.create({
      ...data,
      slug,
      isActive: true,
    });
    return await ProductRepository.save(newProduct);
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

export const getProductService = async (page: number, limit: number) => {
  const [products, total] = await ProductRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: {
      createdAt: "DESC",
    },
  });
  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const searchProductService = async (query: string) => {
  return await ProductRepository.find({
    where: { name: ILike(`%${query}%`) },
  });
};
