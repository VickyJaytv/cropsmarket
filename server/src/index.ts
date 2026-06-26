import "dotenv/config";
import type { Request, Response } from "express";
import express from "express";
import { AppDataSource } from "./data-source.js";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Backend Running </h1>");
});

AppDataSource.initialize()
  .then(() => {
    app.listen(8090, () => console.log("Running on 8090"));
  })
  .catch((err:unknown) => {
    console.error("DB init failed:", err);
    process.exit(1);
  });
