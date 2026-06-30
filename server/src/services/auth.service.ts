import bcrypt from "bcrypt";
import { UserEntity } from "@/repositories/user.repository.js";
import { SignupInterface } from "@/types/auth.types.js";
export const SignUpService = async ({
  firstName,
  lastName,
  email,
  phoneNo,
  password,
  confirmPassword,
  role,
}: SignupInterface) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verif
};
