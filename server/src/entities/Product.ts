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
import { Category } from "./Category.js";
import { Listing } from "./Listing.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "varchar", nullable: true })
  image!: string;

  @ManyToOne(() => Category, (category) => category.product, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @OneToMany(() => Listing, (listing) => listing.product)
  listings!: Listing;
  @JoinColumn({ name: "categoryId" })
  category!: Category;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
