import "reflect-metadata";
import "dotenv/config";
import express from "express";
import CookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";
import { AppDataSource } from "./data-source.js";
import { logger } from "./config/logger.js";
import { authRoutes } from "./routes/auth.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
const app = express();
app.use(express.json());
app.use(CookieParser());
app.use(pinoHttp());
app.get("/", (req, res) => {
    res.send("<h1>Backend Running on port 8090</h1>");
});
AppDataSource.initialize()
    .then(() => {
    // Register routes AFTER database is initialized
    app.use("/api/auth", authRoutes);
    // Register error middleware LAST
    app.use(errorMiddleware);
    app.listen(8090, () => console.log("Running on 8090"));
})
    .catch((err) => {
    logger.error(`DB init failed: ${err}`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map