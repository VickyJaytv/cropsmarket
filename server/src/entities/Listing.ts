import { ListingStatus } from "../enums/enums.js";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { FarmerProfile } from "./FarmerProfile.js";
import type { Product } from "./Product.js";

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne("Product", (product: Product) => product.listings, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Product;

  @ManyToOne("FarmerProfile", (farmer: FarmerProfile) => farmer.listing, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "farmerId" })
  farmer!: FarmerProfile;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({ type: "integer" })
  unit!: number;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ type: "text" })
  location!: string;

  @Column({ type: "boolean", default: true })
  isAvailable!: boolean;

  @Column({ type: "varchar", nullable: true })
  image?: string | null;

  @Column({ type: "enum", enum: ListingStatus, default: ListingStatus.ACTIVE })
  status!: ListingStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
