import {
  Entity,
  Column,
  OneToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product.js";

@Entity()
export class Category {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({ type: "varchar", unique: true })
  slug!: string;

  @Column({ type: "varchar", nullable: true })
  image!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @OneToMany(() => Product, (product) => product.category)
  product!: Product[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
