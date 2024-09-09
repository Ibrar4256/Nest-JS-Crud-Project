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
  createProduct(
    @Body() productDTO: ProductDTO,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.createProduct(productDTO, user);
  }

  @Get('/user') //get products of a specific user with userId (Id stored in session is used for this fetching)
  getProductsByUser(
    @Query() filterDto: GetProductsFilterDTO,
    @GetUser() user: User,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto, user, null);
  }

  @Get('/category/:categoryId')
  getProductsByCategory(
    @Query() filterDto: GetProductsFilterDTO,
    @GetUser() user: User,
    @Param('categoryId') categoryId: string,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto, user, categoryId);
  }

  @Get('/:id')
  getProductById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productService.getProductById(id, user);
  }

  @Delete('/:id')
  deleteProductById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.productService.deleteProductById(id, user);
  }

  @Put('/:id')
  updateProduct(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() productDTO: ProductDTO,
  ): Promise<Product> {
    return this.productService.updateProduct(id, productDTO, user);
  }
}
