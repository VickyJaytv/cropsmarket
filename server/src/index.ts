import "reflect-metadata";
import "dotenv/config";

import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import compression from "compression";
import CookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";

import { AppDataSource } from "./data-source.js";
import { logger } from "./config/logger.js";

import { authRoutes } from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { buyerProfileRoutes } from "./routes/buyerProfile.route.js";
import { apiLimiter } from "./config/rate-limit.js";
import { farmerProfileRoutes } from "./routes/farmerProfile.route.js";
import { adminRoutes } from "./admin/admin.route.js";
import { categoryRoutes } from "./routes/category.route.js";
import { productRoutes } from "./routes/product.route.js";
import { listingRoutes } from "./routes/listing.route.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

// --------------------------------------------------
// Environment validation
// --------------------------------------------------

if (!process.env.JWT_SECRET) {
  logger.error("FATAL: JWT_SECRET environment variable is not defined.");
  process.exit(1);
}

// --------------------------------------------------
// Express app
// --------------------------------------------------

const app = express();

// --------------------------------------------------
// CORS
// --------------------------------------------------

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Currently allowing all origins.
      // Change this to callback(new Error("Not allowed by CORS"))
      // if you want to enforce allowedOrigins.
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());
app.use(compression());
app.use(CookieParser());
app.use(pinoHttp());
app.use(apiLimiter);

// --------------------------------------------------
// Static files
// --------------------------------------------------

app.use("/uploads", express.static("uploads"));

// --------------------------------------------------
// Swagger documentation
// --------------------------------------------------

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "Backend Running",
  });
});

// --------------------------------------------------
// Database initialization
// --------------------------------------------------

console.log("Initializing database...");

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully.");

    // --------------------------------------------------
    // API Routes
    // --------------------------------------------------

    app.use("/api/v1/auth", authRoutes);

    app.use("/api/v1/buyer", buyerProfileRoutes);

    app.use("/api/v1/farmer", farmerProfileRoutes);

    app.use("/api/v1/admin", adminRoutes);

    app.use("/api/v1/categories", categoryRoutes);

    app.use("/api/v1/products", productRoutes);

    app.use("/api/v1/listings", listingRoutes);

    // --------------------------------------------------
    // Error middleware
    // IMPORTANT: Must be registered last
    // --------------------------------------------------

    app.use(errorMiddleware);

    // --------------------------------------------------
    // Start server
    // --------------------------------------------------

    const PORT = process.env.PORT || 8090;

    app.listen(PORT, () => {
      console.log(`listening at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Swagger docs: http://localhost:${PORT}/docs`);
    });
  })
  .catch((err: unknown) => {
    console.error("Database initialization failed:");

    if (err instanceof Error) {
      console.error(err.message);
      console.error(err.stack);
    } else {
      console.error(err);
    }

    process.exit(1);
  });
