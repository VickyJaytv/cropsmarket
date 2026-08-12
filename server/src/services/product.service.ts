import crypto from "crypto";
import slugify from "slugify";
import { Like, QueryFailedError } from "typeorm";
import { ProductRepository } from "../repositories/product.repository.js";
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from "../schema/product.schema.js";
import { AppError } from "../utils/AppError.js";
import { CategoryRepository } from "../repositories/category.repository.js";

export const createProductService = async (
  categoryId: number,
  data: CreateProductDTO,
) => {
  try {
    const slugNumber = crypto.randomBytes(3).toString("hex");
    const baseSlug = slugify(data.name, {
      lower: true,
      trim: true,
    });
    const slug = `${baseSlug}-${slugNumber}`;

    const category = await CategoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new AppError("Category not found.", 404);
    }

    const newProduct = ProductRepository.create({
      name: data.name,
      description: data.description,
      image: data.image,
      category,
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
        throw new AppError("product exists.", 409);
      }
    }

    throw error;
  }
};

export const getProductService = async (
  page: number,
  limit: number,
  filters: Partial<FilterProductDTO> = {},
) => {
  const query = ProductRepository.createQueryBuilder("product")
    .leftJoinAndSelect("product.category", "category")
    .orderBy("product.createdAt", "DESC")
    .skip((page - 1) * limit)
    .take(limit);

  if (filters.name) {
    query.andWhere("product.name LIKE :name", {
      name: `%${filters.name}%`,
    });
  }

  if (filters.categoryId !== undefined) {
    query.andWhere("category.id = :categoryId", {
      categoryId: filters.categoryId,
    });
  }

  if (filters.status !== undefined) {
    query.andWhere("product.isActive = :isActive", {
      isActive: filters.status === "active",
    });
  }

  if (filters.isActive !== undefined) {
    query.andWhere("product.isActive = :isActive", {
      isActive: filters.isActive,
    });
  }

  const [products, total] = await query.getManyAndCount();

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

export const searchProductService = async (
  query: string,
  filters: Partial<FilterProductDTO> = {},
) => {
  const where: any = {
    name: Like(`%${query}%`),
  };

  if (filters.categoryId !== undefined) {
    where.category = { id: filters.categoryId };
  }

  if (filters.status !== undefined) {
    where.isActive = filters.status === "active";
  }

  if (filters.isActive !== undefined) {
    where.isActive = filters.isActive;
  }

  return await ProductRepository.find({
    where,
    relations: { category: true },
    order: {
      createdAt: "DESC",
    },
  });
};

export const getProductByIdService = async (productId: number) => {
  const product = await ProductRepository.findOne({
    where: { id: productId },
    relations: { category: true },
  });

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  return product;
};

export const updateProductService = async (
  productId: number,
  data: UpdateProductDTO,
) => {
  const product = await ProductRepository.findOneByOrFail({
    id: productId,
  });

  if (data.name) {
    const slugNumber = crypto.randomBytes(3).toString("hex");
    const baseSlug = slugify(data.name, { lower: true, trim: true });
    product.slug = `${baseSlug}-${slugNumber}`;
  }

  Object.assign(product, data);
  return await ProductRepository.save(product);
};

export const deleteProductService = async (productId: number) => {
  const product = await ProductRepository.findOneByOrFail({ id: productId });
  return await ProductRepository.remove(product);
};

export const toggleProductStatusService = async (productId: number) => {
  const product = await ProductRepository.findOneByOrFail({ id: productId });
  product.isActive = !product.isActive;
  return await ProductRepository.save(product);
};
