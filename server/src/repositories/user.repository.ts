import { AppDataSource } from "../data-source.js";
import { User } from "@/entities/User.js";

export const UserEntity = AppDataSource.getRepository(User);
