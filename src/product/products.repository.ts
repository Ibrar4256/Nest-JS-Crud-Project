import { DataSource, Repository } from 'typeorm';
import { ProductDTO } from './dto/create-product.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Product } from './product.entity';
import { GetProductsFilterDTO } from './dto/get-product-filter.dto';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  // Using transactions in the createProduct method
  async createProduct(productDTO: ProductDTO, user: User): Promise<Product> {
    return await this.dataSource.transaction(async (manager) => {
      const { name, description, price, categoryId } = productDTO;

      const product = manager.create(Product, {
        name,
        description,
        price,
        categoryId,
        user,
      });

      try {
        await manager.save(product);
        return product;
      } catch (error) {
        throw new InternalServerErrorException('Error creating product');
      }
    });
  }

  // Using transactions in the getProducts method
  async getProducts(
    filterDto: GetProductsFilterDTO,
    user: User,
    categoryId?: string, // A required parameter can not follow an optional parameter(that's why categoryId is last)
  ): Promise<Product[]> {
    return await this.dataSource.transaction(async (manager) => {
      const { search } = filterDto;
      const query = manager.createQueryBuilder(Product, 'product');
      query.where({ user });

      if (categoryId) {
        query.andWhere('product.categoryId = :categoryId', { categoryId });
      }

      if (search) {
        query.andWhere(
          '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
          { search: `%${search}%` },
        );
      }

      try {
        const products = await query.getMany();
        return products;
      } catch (error) {
        throw new InternalServerErrorException('Error retrieving products');
      }
    });
  }

  // Using transactions in the updateProduct method
  async updateProduct(
    id: string,
    productDTO: ProductDTO,
    user: User,
  ): Promise<Product> {
    return await this.dataSource.transaction(async (manager) => {
      const product = await manager.findOne(Product, { where: { id, user } });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const { name, description, price, categoryId } = productDTO;
      product.name = name;
      product.description = description;
      product.price = price;
      product.categoryId = categoryId;

      try {
        await manager.save(product);
        return product;
      } catch (error) {
        throw new InternalServerErrorException('Error updating product');
      }
    });
  }
}
















// import { DataSource, Repository } from 'typeorm';
// import { ProductDTO } from './dto/create-product.dto';
// import {
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { User } from 'src/auth/user.entity';
// import { Product } from './product.entity';
// import { GetProductsFilterDTO } from './dto/get-product-filter.dto';

// @Injectable()
// export class ProductsRepository extends Repository<Product> {
//   constructor(private dataSource: DataSource) {
//     super(Product, dataSource.createEntityManager());
//   }

//   async createProduct(productDTO: ProductDTO, user: User): Promise<Product> {
//     const { name, description, price, categoryId } = productDTO;

//     const product = this.create({
//       name,
//       description,
//       price,
//       categoryId,
//       user,
//     });
//     try {
//       await this.save(product);
//       return product;
//     } catch (error) {
//       throw new InternalServerErrorException();
//     }
//   }

//   async getProducts(
//     filterDto: GetProductsFilterDTO,
//     user: User,
//     categoryId?: string, // A required parameter can not follow an optional parameter(that's why categoryId is last)
//   ): Promise<Product[]> {
//     const { search } = filterDto;
//     const query = this.createQueryBuilder('product');
//     query.where({ user });

//     if (categoryId) {
//       query.andWhere('product.categoryId = :categoryId', { categoryId });
//     }

//     if (search) {
//       query.andWhere(
//         '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))',
//         { search: `%${search}%` },
//       );
//     }
//     try {
//       const products = await query.getMany();
//       return products;
//     } catch (error) {
//       throw new InternalServerErrorException();
//     }
//   }

//   async updateProduct(
//     id: string,
//     productDTO: ProductDTO,
//     user: User,
//   ): Promise<Product> {
//     const product = await this.findOne({ where: { id, user } });

//     if (!product) {
//       throw new NotFoundException();
//     }

//     const { name , description, price, categoryId} = productDTO;
//     product.name  = name;
//     product.description  = description;
//     product.price  = price;
//     product.categoryId  = categoryId;

//     try {
//       await this.save(product);
//       return product;
//     } catch (error) {
//       throw new InternalServerErrorException();
//     }
//   }
// }
