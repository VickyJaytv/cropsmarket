import { ListingStatus } from "@/enums/enums.js";
import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { FarmerProfile } from "./FarmerProfile.js";
import { Product } from "./Product.js";

@Entity()
export class Listing {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "integer" })
  quantity!: number;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "varchar", nullable: true })
  image!: string | null;

  @Column({ type: "enum", enum: ListingStatus, default: ListingStatus.ACTIVE })
  status!: ListingStatus;

  @ManyToOne(() => Product, (product) => product.listings)
  @JoinColumn({ name: "productId" })
  product!: Product;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
