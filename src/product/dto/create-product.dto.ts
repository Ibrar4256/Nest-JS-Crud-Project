import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ObjectId } from 'typeorm';

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  price: Number;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;
}
