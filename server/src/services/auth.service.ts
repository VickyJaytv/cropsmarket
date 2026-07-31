import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import { LoginDTO, SignupDTO } from "../schema/auth.schema.js";
import { AppError } from "../utils/AppError.js";
import { QueryFailedError } from "typeorm";
import { PublicUserInterface } from "@/interfaces/user.interface.js";
export const SignUpService = async (data: SignupDTO) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const newUser = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });
    await UserRepository.save(newUser);
    return newUser;
  } catch (err) {
    if (err instanceof QueryFailedError) {
      const driverError = (
        err as QueryFailedError & {
          driverError?: { errno?: number };
        }
      ).driverError;

      if (driverError?.errno === 1062) {
        throw new AppError(
          "unable to create account with the provided details.",
          400,
        );
      }
    }
    throw err;
  }
};

export const LoginService = async ({
  email,
  password,
}: LoginDTO): Promise<PublicUserInterface> => {
  const user = await UserRepository.createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.email = :email", { email })
    .getOne();
  if (!user) {
    throw new AppError("invalid email or password", 401);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("invalid email or password", 401);
  }
  const saveUser = await UserRepository.save(user);
  return saveUser;
};

export const logoutService = async (userId: number) => {
  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError("if you were logged in, you've been logged out", 200);
  }
};
