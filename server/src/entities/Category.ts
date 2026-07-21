import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product.js";
import { User } from "./User.js";

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

  @OneToMany(() => Product, (product) => product.category)
  product!: Product[];

  @ManyToOne(() => User, (user) => user.categories)
  admin!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
