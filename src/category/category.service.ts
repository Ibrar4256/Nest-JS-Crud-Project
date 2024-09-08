import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './dto/create-category.dto';
import { User } from 'src/auth/user.entity';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(private categoryRepository: CategoryRepository) {}


    async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
        return this.categoryRepository.createCategory(categoryDTO);
      }
}
