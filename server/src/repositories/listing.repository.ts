import { AppDataSource } from "../data-source.js";
import { Listing } from "../entities/Listing.js";

export const ListingRepository = AppDataSource.getRepository(Listing);
