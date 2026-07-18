import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/AppError.js";

const uploadPath = path.join(process.cwd(), "uploads", "profiles");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
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
