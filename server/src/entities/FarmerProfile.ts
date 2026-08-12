import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User.js";
import { Listing } from "./Listing.js";

@Entity()
export class FarmerProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  // user to farmer profile relationship
  @OneToOne(() => User, (user) => user.farmerProfile)
  @JoinColumn({ name: "userId" })
  user!: User;

  @OneToMany(() => Listing, (listing) => listing.farmer)
  @JoinColumn({ name: "listingId" })
  listing!: Listing;

  @Column({ type: "varchar", nullable: true })
  profilePicture!: string | null;

  @Column({ type: "varchar", nullable: true })
  farmName!: string | null;

  @Column({ type: "varchar", nullable: true })
  address!: string | null;

  @Column({ type: "varchar" })
  state!: string;

  @Column({ type: "varchar" })
  lga!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
