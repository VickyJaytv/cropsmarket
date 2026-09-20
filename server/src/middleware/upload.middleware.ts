import { upload } from "../config/multer.config.js";

export const uploadProfilePicture = upload.single("profilePicture");

export const uploadProductImage = upload.single("productImage");

export const uploadListingImage = upload.single("image");

export const uploadVerificationDocument = upload.single("document");
