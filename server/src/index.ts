import "reflect-metadata";
import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";
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

if (!process.env.JWT_SECRET) {
  logger.error("FATAL: JWT_SECRET environment variable is not defined.");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(compression());
app.use(CookieParser());
app.use(pinoHttp());
app.use(apiLimiter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "Backend Running" });
});

AppDataSource.initialize()
  .then(() => {
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/buyer", buyerProfileRoutes);
    app.use("/api/v1/farmer", farmerProfileRoutes);
    app.use("/api/v1/admin", adminRoutes);
    app.use("/api/v1/categories", categoryRoutes);
    app.use("/api/v1/products", productRoutes);
    app.use("/api/v1/listings", listingRoutes);

    // error middleware LAST
    app.use(errorMiddleware);

    // listen to server port
    const PORT = process.env.PORT || 8090;
    app.listen(PORT, () =>
      console.log(`listening at http://localhost:${PORT}`),
    );
  })
  .catch((err: unknown) => {
    logger.error(`DB init failed: ${err}`);
    process.exit(1);
  });
