import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { User } from "./entities/User.js";
import { Category } from "./entities/Category.js";
import { Product } from "./entities/Product.js";
import { Listing } from "./entities/Listing.js";
import { BuyerProfile } from "./entities/BuyerProfile.js";
import { FarmerProfile } from "./entities/FarmerProfile.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPassword = process.env.DB_PASSWORD || "";
const dbUsername = process.env.DB_USERNAME || "";
const dbName = process.env.DB_NAME || "";
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  synchronize: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
  logging: false,
  // entities: [__dirname + "/../entities/*.{ts,js}"],
  // migrations: [__dirname + "/../migrations/*.{ts,js}"],
  entities: [User, Category, Product, Listing, BuyerProfile, FarmerProfile],
  migrations: [],
});
