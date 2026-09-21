import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Category } from "./entities/Category.js";
import { Product } from "./entities/Product.js";
import { Listing } from "./entities/Listing.js";
import { BuyerProfile } from "./entities/BuyerProfile.js";
import { FarmerProfile } from "./entities/FarmerProfile.js";

export const AppDataSource = new DataSource({
  type: "postgres",

  // Render
  url: process.env.DATABASE_URL,

  // Local fallback
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT
    ? Number(process.env.POSTGRES_PORT)
    : 5432,
  username: process.env.POSTGRES_USER || "",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DB || "cropsmarket",

  synchronize:
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test",

  logging: false,

  entities: [
    User,
    Category,
    Product,
    Listing,
    BuyerProfile,
    FarmerProfile,
  ],

  migrations: [],
});
