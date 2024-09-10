import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: Number;

  // Foreign key column for Category (categoryId)
  @Column('uuid')
  categoryId: string;

  // Foreign key column for User (userId)
  @Column('uuid')
  userId: string;

  @ManyToOne((_type) => Category, (category) => category.product, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  category: Category;

  @ManyToOne((_type) => User, (user) => user.product, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
