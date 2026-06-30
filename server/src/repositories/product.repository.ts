import { AppDataSource } from "@/data-source.js";
import { Product } from "@/entities/Product.js";

export const ProductEntity = AppDataSource.getRepository(Product);
