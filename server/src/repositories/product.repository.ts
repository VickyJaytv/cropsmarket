import { AppDataSource } from "../data-source.js";
import { Product } from "../entities/Product.js";

export const ProductRepository = AppDataSource.getRepository(Product);
