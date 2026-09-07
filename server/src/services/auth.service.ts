import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository.js";
import {
  ForgotPasswordDTO,
  LoginDTO,
  ResetPasswordDTO,
  SignupDTO,
} from "../schema/auth.schema.js";
import { AppError } from "../utils/AppError.js";
import { QueryFailedError } from "typeorm";
import { PublicUserInterface } from "../interfaces/user.interface.js";
import { logger } from "../config/logger.js";
export const SignUpService = async (data: SignupDTO) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const newUser = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });
    const savedUser = await UserRepository.save(newUser);
    const {
      password: _p,
      passwordResetToken: _prt,
      passwordResetTokenExpiresAt: _prte,
      ...sanitizedUser
    } = savedUser;
    return sanitizedUser;
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
  const {
    password: _p,
    passwordResetToken: _prt,
    passwordResetTokenExpiresAt: _prte,
    ...sanitizedUser
  } = user;
  return sanitizedUser as PublicUserInterface;
};

export const logoutService = async (userId: number) => {
  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  user.tokenVersion = (user.tokenVersion || 1) + 1;
  await UserRepository.save(user);
};

export const forgotPasswordService = async ({ email }: ForgotPasswordDTO) => {
  const user = await UserRepository.findOne({ where: { email } });

  if (!user) {
    return {
      message:
        "If an account with that email exists, a password reset token has been sent.",
    };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = hashedToken;
  user.passwordResetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await UserRepository.save(user);

  logger.info(`[Password Reset] Generated reset token for user ID ${user.id}`);

  return {
    message:
      "If an account with that email exists, a password reset token has been sent.",
    ...(process.env.NODE_ENV !== "production" && { resetToken }),
  };
};

export const resetPasswordService = async ({
  token,
  password,
}: ResetPasswordDTO) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await UserRepository.createQueryBuilder("user")
    .addSelect("user.passwordResetToken")
    .addSelect("user.passwordResetTokenExpiresAt")
    .where("user.passwordResetToken = :hashedToken", { hashedToken })
    .andWhere("user.passwordResetTokenExpiresAt > :now", { now: new Date() })
    .getOne();

  if (!user) {
    throw new AppError("Password reset token is invalid or has expired.", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  user.passwordResetToken = null;
  user.passwordResetTokenExpiresAt = null;
  user.tokenVersion = (user.tokenVersion || 1) + 1;

  await UserRepository.save(user);

  return {
    message:
      "Password reset successfully. Please log in with your new password.",
  };
};

