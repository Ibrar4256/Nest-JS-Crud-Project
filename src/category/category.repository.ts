import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
    const { name } = categoryDTO;

    const category = this.create({
      name
    });
    try {
      await this.save(category);
      return category;
    } catch (error) 
      {
        throw new InternalServerErrorException();
      }
    }
  }
