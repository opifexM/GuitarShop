// @ts-nocheck
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProductDto } from './product.dto';

export class ProductPaginationDto {
  @Expose()
  @ApiProperty({
    description: 'Array of Products entities',
    type: [ProductDto],
  })
  public entities: ProductDto[];

  @Expose()
  @ApiProperty({
    description: 'Total number of available pages',
    example: 5,
  })
  public totalPages: number;


  @Expose()
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  public currentPage: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of items across all pages',
    example: 50,
  })
  public totalItems: number;

  @Expose()
  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  public itemsPerPage: number;
}
