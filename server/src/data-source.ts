import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { User } from "./entities/User.js";
import { Category } from "./entities/Category.js";
import { Product } from "./entities/Product.js";
import { Listing } from "./entities/Listing.js";
import { BuyerProfile } from "./entities/BuyerProfile.js";
import { FarmerProfile } from "./entities/FarmerProfile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPassword = process.env.POSTGRES_PASSWORD || "";
const dbUsername = process.env.POSTGRES_USER || "";
const dbName = process.env.POSTGRES_DB || "cropsmarket";
const dbPort = process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
  logging: false,
  entities: [User, Category, Product, Listing, BuyerProfile, FarmerProfile],
  migrations: [],
});
