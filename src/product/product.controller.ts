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
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/create-product.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Product } from './product.entity';
import { User } from 'src/auth/user.entity';
import { GetProductsFilterDTO } from './dto/get-product-filter.dto';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private productService: ProductService) {} // Dependency Injection By creating a constructor(NEST handles(adds) this Dependency Injection itself in the background)

  @Post()
  async createProduct(
    @Body() productDTO: ProductDTO,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      return this.productService.createProduct(productDTO, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  @Get('/user') //get products of a specific user with userId (Id stored in session is used for this fetching)
  async getProductsByUser(
    @Query() filterDto: GetProductsFilterDTO,
    @GetUser() user: User,
  ): Promise<Product[]> {
    try {
      return this.productService.getProducts(filterDto, user, null);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  @Get('/category/:categoryId')
  getProductsByCategory(
    @Query() filterDto: GetProductsFilterDTO,
    @GetUser() user: User,
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    try {
      return this.productService.getProducts(filterDto, user, categoryId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    try {
      return this.productService.getProductById(id, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }

  @Delete('/:id')
  deleteProductById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    try {
      return this.productService.deleteProductById(id, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() productDTO: ProductDTO,
  ): Promise<Product> {
    try {
      return this.productService.updateProduct(id, productDTO, user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }
}
