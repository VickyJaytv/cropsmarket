import { AppDataSource } from "@/data-source.js";
import { BuyerProfile } from "../entities/BuyerProfile.js";

export const BuyerProfileRepository = AppDataSource.getRepository(BuyerProfile);
