import { AppDataSource } from "../data-source.js";
import { Category } from "../entities/Category.js";

export const CategoryRepository = AppDataSource.getRepository(Category);
