import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndCookies = (
  res: Response,
  userId: string,
  tokenVersion: number = 1,
) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  const token = jwt.sign({ userId, tokenVersion }, jwtSecret, {
    expiresIn: "7d",
  });

  // Set token as HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
