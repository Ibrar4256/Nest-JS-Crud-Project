import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from './dto/create-product.dto';
import { User } from 'src/auth/user.entity';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';
import { GetProductsFilterDTO } from './dto/get-product-filter.dto';

@Injectable()
export class ProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async createProduct(productDTO: ProductDTO, user: User): Promise<Product> {
    return this.productsRepository.createProduct(productDTO, user);
  }

  getProducts(filterDto: GetProductsFilterDTO, user: User, categoryId?: string,): Promise<Product[]>{
    return this.productsRepository.getProducts(filterDto,user, categoryId);
  }

  async getProductById(id: string, user: User): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id , user} });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async deleteProductById(id: string, user: User): Promise<void> {
    const result = await this.productsRepository.delete({id, user});

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateProduct(id: string, productDTO: ProductDTO, user: User): Promise<Product> {
    return this.productsRepository.updateProduct(id,productDTO, user);
  }

}
