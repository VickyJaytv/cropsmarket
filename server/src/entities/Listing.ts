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
import { FarmerProfile } from "./FarmerProfile.js";
import { Product } from "./Product.js";

@Entity()
export class Listing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.listings)
  @JoinColumn({ name: "productId" })
  product!: Product;

  @ManyToOne(() => FarmerProfile, (farmer) => farmer.listing)
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
