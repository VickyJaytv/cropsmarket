import { upload } from "../config/multer.config.js";

export const uploadProfilePicture = upload.single("profilePicture");

export const uploadProductImages = upload.array("images", 10);

export const uploadVerificationDocument = upload.single("document");
