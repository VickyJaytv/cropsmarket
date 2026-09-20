import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/AppError.js";

const uploadBase = path.join(process.cwd(), "uploads");
const subDirs = ["profiles", "products", "listings", "documents"];

subDirs.forEach((dir) => {
  const fullPath = path.join(uploadBase, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = "profiles";
    if (file.fieldname === "image" || file.fieldname === "listingImage") {
      folder = "listings";
    } else if (file.fieldname === "productImage") {
      folder = "products";
    } else if (file.fieldname === "document") {
      folder = "documents";
    }
    cb(null, path.join(uploadBase, folder));
  },

  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueName}${path.extname(file.originalname).toLowerCase()}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new AppError("Only JPG, JPEG, PNG and WEBP images are allowed.", 400),
    );
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
