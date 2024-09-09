import {
  Controller,
  UseGuards,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/create-category.dto';
// import { GetUser } from 'src/auth/get-user.decorator';
import { Category } from './category.entity';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private categoryService: CategoryService) {} // Dependency Injection By creating a constructor(NEST handles(adds) this Dependency Injection itself in the background)

  @Post()
  createCategory(@Body() categoryDTO: CategoryDTO): Promise<Category> {
    try {
      return this.categoryService.createCategory(categoryDTO);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }
}
