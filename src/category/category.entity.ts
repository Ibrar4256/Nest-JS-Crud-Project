// import { Task } from 'src/tasks/task.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany((_type) => Product, (product) => product.category, { eager: true })
  product: Product[];
}
