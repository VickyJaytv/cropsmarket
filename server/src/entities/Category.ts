import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import type { Product } from "./Product.js";
import type { User } from "./User.js";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  name!: string;

  @Column({ type: "varchar", unique: true })
  slug!: string;

  @Column({ type: "varchar", nullable: true })
  image!: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @OneToMany("Product", (product: Product) => product.category)
  products!: Product[];

  @ManyToOne("User", (user: User) => user.categories)
  admin!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
