import { AppDataSource } from "../data-source.js";
import { FarmerProfile } from "../entities/FarmerProfile.js";

export const FarmerProfileRepository =
  AppDataSource.getRepository(FarmerProfile);
