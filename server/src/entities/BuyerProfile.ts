import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class BuyerProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.buyerProfile)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "varchar", nullable: true })
  profilePicture!: string | null;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column({ type: "varchar", nullable: true })
  companyName!: string | null;

  @Column({ type: "varchar" })
  state!: string;

  @Column({ type: "varchar" })
  lga!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
