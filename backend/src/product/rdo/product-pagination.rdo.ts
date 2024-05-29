import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProductRdo } from './product.rdo';

export class ProductPaginationRdo {
  @Expose()
  @ApiProperty({
    description: 'Array of Products entities',
    type: [ProductRdo],
  })
  public entities: ProductRdo[];

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
