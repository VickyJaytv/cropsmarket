import bcrypt from "bcrypt";
import { User } from "../entities/User.js";
import { UserRepository } from "../repositories/user.repository.js";
import { Role } from "../enums/enums.js";

export const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);

  await UserRepository.createQueryBuilder()
    .insert()
    .into(User)
    .values({
      firstName: process.env.ADMIN_FIRST_NAME!,
      lastName: process.env.ADMIN_LAST_NAME!,
      email: process.env.ADMIN_EMAIL!,
      phoneNumber: process.env.ADMIN_PHONE_NUMBER!,
      password: hashedPassword,
      role: Role.ADMIN,
    })
    .orIgnore()
    .execute();
};
