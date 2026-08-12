import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import type { Category } from "./Category.js";
import type { Listing } from "./Listing.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ type: "varchar", nullable: true })
  image?: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @ManyToOne("Category", (category: Category) => category.products, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({ name: "categoryId" })
  category!: Category;

  @OneToMany("Listing", (listing: Listing) => listing.product)
  listings!: Listing[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
