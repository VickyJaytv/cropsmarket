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

const app = express();
app.use(express.json());
app.use(compression());
app.use(CookieParser());
app.use(pinoHttp());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Backend Running on port 8090</h1>");
});

AppDataSource.initialize()
  .then(() => {
    // Register routes AFTER database is initialized
    app.use("/api/auth", authRoutes);
    app.use("/api/buyers", buyerProfileRoutes);
    // Register error middleware LAST
    app.use(errorMiddleware);

    app.listen(8090, () => console.log(`listening at http://localhost:8090`));
  })
  .catch((err: unknown) => {
    logger.error(`DB init failed: ${err}`);
    process.exit(1);
  });
