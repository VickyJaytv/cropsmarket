import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndCookies = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const token = jwt.sign(jwtSecret, userId, {
    expiresIn: "7d",
  });

  // Set token as HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
