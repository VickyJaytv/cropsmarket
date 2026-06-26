import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
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
    synchronize: true,
    logging: false,
    entities: [join(__dirname, "/entities/**/*{.js,.ts}")],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map