import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { SortDirection } from 'shared/type/sort-direction.interface';

export class ProductQuery {
  @ApiPropertyOptional({
    description: 'Page number of the product pagination',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public page?: number;

  @ApiPropertyOptional({
    description: 'Limit the number of product returned',
    type: Number,
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public limit?: number;

  @ApiPropertyOptional({
    description: 'Direction of product sorting (ASC or DESC)',
    enum: SortDirection,
    example: SortDirection.ASC,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection;
}
