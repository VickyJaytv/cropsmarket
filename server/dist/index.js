import "dotenv/config";
import express from "express";
import { AppDataSource } from "./data-source.js";
const app = express();
app.get("/", (req, res) => {
    res.send("<h1>Backend Running </h1>");
});
AppDataSource.initialize()
    .then(() => {
    app.listen(8090, () => console.log("Running on 8090"));
})
    .catch((err) => {
    console.error("DB init failed:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map