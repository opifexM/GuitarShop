// @ts-nocheck
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum';
import { GuitarType } from 'shared/type/product/guitar-type.enum';
import { SortDirection } from 'shared/type/sort-direction.interface';
import { SortType } from 'shared/type/sort-type.enum';

export class ProductQuery {
  @ApiPropertyOptional({
    description: 'Page number of the product pagination',
    type: Number,
    example: 1
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public page?: number;

  @ApiPropertyOptional({
    description: 'Limit the number of product returned',
    type: Number,
    example: 10
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public limit?: number;

  @ApiPropertyOptional({
    description: 'Filter product by Guitar Type',
    isArray: true,
    enum: GuitarType,
    example: [GuitarType.ELECTRO, GuitarType.ACOUSTIC]
  })
  @IsIn(Object.values(GuitarType), { each: true })
  @IsOptional()
  public guitarType?: GuitarType[];

  @ApiPropertyOptional({
    description: 'Filter product by Guitar String Type',
    isArray: true,
    enum: GuitarStringType,
    example: [GuitarStringType.FOUR, GuitarStringType.SIX]
  })
  @IsOptional()
  @IsIn(Object.values(GuitarStringType), { each: true })
  @Transform(({ value }) => value.map((v: string) => parseInt(v, 10)))
  @IsOptional()
  public guitarStringType?: GuitarStringType[];

  @ApiPropertyOptional({
    description: 'Direction of product sorting (ASC or DESC)',
    enum: SortDirection,
    example: SortDirection.ASC
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection;

  @ApiPropertyOptional({
    description: 'Type of sorting to be applied to the post list',
    enum: SortType,
    example: SortType.BY_DATE
  })
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortType?: SortType;
}
