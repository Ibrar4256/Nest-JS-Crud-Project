import { IsOptional, IsString } from 'class-validator';

export class GetProductsFilterDTO {
  @IsOptional()
  @IsString()
  search?: string;
}
