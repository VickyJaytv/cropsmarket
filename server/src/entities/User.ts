import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Role, AccountType } from "../enums/enums.js";
import { BuyerProfile } from "./BuyerProfile.js";
import { FarmerProfile } from "./FarmerProfile.js";

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

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({ type: "enum", enum: Role, default: Role.BUYER })
  role!: Role;

  @Column({
    type: "enum",
    enum: AccountType,
  })
  AccountType!: AccountType;

  @Column({ type: "varchar", nullable: true })
  passwordResetToken!: string | null;

  @Column({ type: "datetime", nullable: true })
  passwordResetTokenExpiresAt!: Date | null;

  // Relationship between user and buyer profile
  @OneToOne(() => BuyerProfile, (buyerProfile) => buyerProfile.user)
  buyerProfile!: BuyerProfile;

  // Relationship between user and farmer profile
  @OneToOne(() => FarmerProfile, (farmerProfile) => farmerProfile.user)
  farmerProfile!: FarmerProfile;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
