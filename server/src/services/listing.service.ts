import { ILike } from "typeorm";
import { ListingRepository } from "../repositories/listing.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import {
  CreateListingDTO,
  FilterListingDTO,
  UpdateListingDTO,
} from "../schema/listing.schema.js";
import { AppError } from "../utils/AppError.js";
import { UserRepository } from "../repositories/user.repository.js";

export const createListingService = async (
  productId: number,
  data: CreateListingDTO,
) => {
  const product = await ProductRepository.findOne({
    where: { id: productId },
  });
  if (!product) {
    throw new AppError("product not found", 404);
  }
  const newListing = await ListingRepository.create({
    ...data,
    product,
    isAvailable: true,
  });
  return await ListingRepository.save(newListing);
};

export const getPersonalListingsService = async (
  page: number,
  limit: number,
  userId: number,
  filters: FilterListingDTO = {},
) => {
  const query = ListingRepository.createQueryBuilder("listing")
    .leftJoinAndSelect("listing.farmer", "farmer")
    .leftJoinAndSelect("farmer.user", "user")
    .leftJoinAndSelect("listing.product", "product")
    .where("user.id = :userId", { userId });

  if (filters.name) {
    query.andWhere("product.name LIKE :name", {
      name: `%${filters.name}%`,
    });
  }

  if (filters.status) {
    query.andWhere("listing.status = :status", {
      status: filters.status,
    });
  }

  if (filters.minPrice !== undefined) {
    query.andWhere("listing.price >= :minPrice", {
      minPrice: filters.minPrice,
    });
  }

  if (filters.maxPrice !== undefined) {
    query.andWhere("listing.price <= :maxPrice", {
      maxPrice: filters.maxPrice,
    });
  }

  if (filters.minQuantity !== undefined) {
    query.andWhere("listing.quantity >= :minQuantity", {
      minQuantity: filters.minQuantity,
    });
  }

  if (filters.maxQuantity !== undefined) {
    query.andWhere("listing.quantity <= :maxQuantity", {
      maxQuantity: filters.maxQuantity,
    });
  }

  query
    .orderBy("listing.createdAt", "DESC")
    .skip((page - 1) * limit)
    .take(limit);

  const [listings, total] = await query.getManyAndCount();

  return {
    listings,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getListingByIdService = async (listingId: number) => {
  const listing = await ListingRepository.createQueryBuilder("listing")
    .leftJoinAndSelect("listing.product", "product")
    .leftJoinAndSelect("product.category", "category")
    .leftJoinAndSelect("listing.farmer", "farmer")
    .leftJoinAndSelect("farmer.user", "user")
    .where("listing.id = :listingId", { listingId })
    .select([
      "listing.id",
      "listing.quantity",
      "listing.unit",
      "listing.price",
      "listing.description",
      "listing.location",
      "listing.isAvailable",
      "listing.image",
      "listing.status",
      "listing.createdAt",
      "listing.updatedAt",
      "product.id",
      "product.name",
      "product.description",
      "product.image",
      "product.isActive",
      "product.createdAt",
      "product.updatedAt",
      "category.id",
      "category.name",
      "category.slug",
      "category.isActive",
      "farmer.id",
      "farmer.profilePicture",
      "farmer.farmName",
      "farmer.address",
      "farmer.state",
      "farmer.lga",
      "user.id",
      "user.firstName",
      "user.lastName",
      "user.email",
      "user.phoneNumber",
      "user.role",
      "user.accountType",
      "user.createdAt",
      "user.updatedAt",
    ])
    .getOne();

  if (!listing) {
    throw new AppError("Listing not found.", 404);
  }

  return listing;
};

export const getAllListingsService = async (
  page: number,
  limit: number,
  filters: FilterListingDTO = {},
) => {
  const query = ListingRepository.createQueryBuilder("listing")
    .leftJoinAndSelect("listing.product", "product")
    .leftJoinAndSelect("product.category", "category")
    .leftJoinAndSelect("listing.farmer", "farmer")
    .leftJoinAndSelect("farmer.user", "user")
    .where("listing.id IS NOT NULL");

  if (filters.name) {
    query.andWhere("product.name LIKE :name", {
      name: `%${filters.name}%`,
    });
  }

  if (filters.status) {
    query.andWhere("listing.status = :status", {
      status: filters.status,
    });
  }

  if (filters.minPrice !== undefined) {
    query.andWhere("listing.price >= :minPrice", {
      minPrice: filters.minPrice,
    });
  }

  if (filters.maxPrice !== undefined) {
    query.andWhere("listing.price <= :maxPrice", {
      maxPrice: filters.maxPrice,
    });
  }

  if (filters.minQuantity !== undefined) {
    query.andWhere("listing.quantity >= :minQuantity", {
      minQuantity: filters.minQuantity,
    });
  }

  if (filters.maxQuantity !== undefined) {
    query.andWhere("listing.quantity <= :maxQuantity", {
      maxQuantity: filters.maxQuantity,
    });
  }

  if (filters.state) {
    query.andWhere("farmer.state = :state", { state: filters.state });
  }

  if (filters.lga) {
    query.andWhere("farmer.lga = :lga", { lga: filters.lga });
  }

  if (filters.farmerId !== undefined) {
    query.andWhere("farmer.id = :farmerId", {
      farmerId: filters.farmerId,
    });
  }

  if (filters.farmerName) {
    query.andWhere(
      "(user.firstName LIKE :farmerName OR user.lastName LIKE :farmerName)",
      { farmerName: `%${filters.farmerName}%` },
    );
  }

  const sortBy = filters.sortBy ?? "createdAt";
  const sortOrder = (filters.sortOrder ?? "DESC").toUpperCase();

  query.orderBy(`listing.${sortBy}`, sortOrder === "ASC" ? "ASC" : "DESC");

  query.skip((page - 1) * limit).take(limit);

  const [listings, total] = await query.getManyAndCount();

  return {
    listings,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const searchListingService = async (query: string) => {
  return await ListingRepository.find({
    where: { product: ILike(`%${query}%`) },
  });
};

export const updateListingService = async (
  listingId: number,
  data: UpdateListingDTO,
  userId?: number,
  isAdmin = false,
) => {
  const listing = await ListingRepository.findOne({
    where: { id: listingId },
    relations: { farmer: { user: true } },
  });

  if (!listing) {
    throw new AppError("Listing not found.", 404);
  }

  if (!isAdmin && userId !== undefined && listing.farmer?.user?.id !== userId) {
    throw new AppError("Forbidden", 403);
  }

  Object.assign(listing, data);

  return await ListingRepository.save(listing);
};

export const deleteListingService = async (
  listingId: number,
  userId?: number,
  isAdmin = false,
) => {
  const listing = await ListingRepository.findOne({
    where: { id: listingId },
    relations: { farmer: { user: true } },
  });

  if (!listing) {
    throw new AppError("Listing not found.", 404);
  }

  if (!isAdmin && userId !== undefined && listing.farmer?.user?.id !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return await ListingRepository.remove(listing);
};
