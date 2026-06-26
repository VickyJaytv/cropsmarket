"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_js_1 = require("./entities/User.js");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "typeorm",
    synchronize: true,
    logging: false,
    entities: [User_js_1.User],
    migrations: [],
    subscribers: [],
});
