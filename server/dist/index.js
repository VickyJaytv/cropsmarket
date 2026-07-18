import "reflect-metadata";
import "dotenv/config";
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
const app = express();
app.use(express.json());
app.use(compression());
app.use(CookieParser());
app.use(pinoHttp());
app.use(apiLimiter);
app.get("/", (req, res) => {
    res.send("<h1>Backend Running on port 8090</h1>");
});
AppDataSource.initialize()
    .then(() => {
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/buyer", buyerProfileRoutes);
    app.use("/api/v1/farmer", farmerProfileRoutes);
    // error middleware LAST
    app.use(errorMiddleware);
    // listen to server port
    app.listen(8090, () => console.log(`listening at http://localhost:8090`));
})
    .catch((err) => {
    logger.error(`DB init failed: ${err}`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map