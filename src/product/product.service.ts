import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductDTO } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { GetProductsFilterDTO } from './dto/get-product-filter.dto';

@Injectable()
export class ProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async createProduct(productDTO: ProductDTO, user: User): Promise<Product> {
    try {
      return this.productsRepository.createProduct(productDTO, user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create the product (services)',
      );
    }
  }

  async getProducts(
    filterDto: GetProductsFilterDTO,
    user: User,
    categoryId?: string,
  ): Promise<Product[]> {
    try {
      return this.productsRepository.getProducts(filterDto, user, categoryId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch product(s) (services)',
      );
    }
  }

  async getProductById(id: string, user: User): Promise<Product> {
    try {
      const product = await this.productsRepository.findOne({
        where: { id, user },
      });
      if (!product) {
        throw new NotFoundException('Product Not Found');
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch the product (services)',
      );
    }
  }

  async deleteProductById(id: string, user: User): Promise<void> {
    try {
      const product = await this.productsRepository.delete({ id, user });

      if (product.affected === 0) {
        //when delete is used no. of rows affected is returned
        throw new NotFoundException('Product Not Found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to delete product (services)',
      );
    }
  }

  async updateProduct(
    id: string,
    productDTO: ProductDTO,
    user: User,
  ): Promise<Product> {
    try {
      return this.productsRepository.updateProduct(id, productDTO, user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Rethrow NotFoundException if it's raised by the repository
      }
      throw new InternalServerErrorException(
        'Failed to update product (services)',
      );
    }
  }
}
