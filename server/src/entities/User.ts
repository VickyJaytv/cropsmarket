import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../enums/role.enum.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  firstName!: string;

  @Column({ type: "varchar" })
  lastName!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", unique: true })
  phoneNumber!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "enum", enum: Role, default: Role.BUYER })
  role!: string;

  @Column({ type: "varchar", nullable: true, default: null })
  passwordResetToken!: string;

  @Column({ type: "datetime", nullable: true, default: null })
  passwordResetTokenExpiresAt!: Date | null;

  @Column({ type: "boolean", default: false })
  isLoggedIn!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
