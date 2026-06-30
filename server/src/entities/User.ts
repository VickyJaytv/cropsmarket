import { Role } from "@/enums/role.enum.js";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: number;

  @Column({ unique: true })
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: Role, default: Role.BUYER })
  role!: string;

  @Column()
  verificationToken!: string;

  @Column({ type: "datetime" })
  verificationTokenExpiresAt!: Date;

  @Column()
  passwordResetToken!: string;

  @Column({ type: "datetime" })
  passwordResetTokenExpiresAt!: Date;

  @Column({ default: false })
  isLoggedIn!: boolean;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
