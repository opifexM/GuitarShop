// @ts-nocheck
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum';
import { GuitarType } from 'shared/type/product/guitar-type.enum';
import { PRODUCT } from '../../../../backend/src/product/entity/product.constant';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(PRODUCT.TITLE.MIN, PRODUCT.TITLE.MAX)
  @ApiPropertyOptional({
    example: 'Fender Stratocaster',
    description: 'The title of the product',
    minLength: PRODUCT.TITLE.MIN,
    maxLength: PRODUCT.TITLE.MAX,
  })
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(PRODUCT.DESCRIPTION.MIN, PRODUCT.DESCRIPTION.MAX)
  @ApiPropertyOptional({
    example: 'A classic guitar model known for its versatility and tone.',
    description: 'The description of the product',
    minLength: PRODUCT.DESCRIPTION.MIN,
    maxLength: PRODUCT.DESCRIPTION.MAX,
  })
  public description?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'photo123',
    description: 'The ID of the photo associated with the product',
  })
  public photoId?: string;

  @IsOptional()
  @IsEnum(GuitarType)
  @ApiPropertyOptional({
    example: GuitarType.ELECTRO,
    description: 'The type of the guitar',
    enum: GuitarType,
  })
  public guitarType?: GuitarType;

  @IsOptional()
  @IsString()
  @Length(PRODUCT.ARTICLE.MIN, PRODUCT.ARTICLE.MAX)
  @ApiPropertyOptional({
    example: 'ART12345',
    description: 'The article of the product',
    minLength: PRODUCT.ARTICLE.MIN,
    maxLength: PRODUCT.ARTICLE.MAX,
  })
  public article?: string;

  @IsOptional()
  @IsEnum(GuitarStringType)
  @ApiPropertyOptional({
    example: GuitarStringType.SIX,
    description: 'The type of strings used in the guitar',
    enum: GuitarStringType,
  })
  public guitarStringType?: GuitarStringType;

  @IsOptional()
  @IsNumber()
  @Min(PRODUCT.PRICE.MIN)
  @Max(PRODUCT.PRICE.MAX)
  @ApiProperty({
    example: 1500,
    description: 'The price of the product',
    minimum: PRODUCT.PRICE.MIN,
    maximum: PRODUCT.PRICE.MAX,
  })
  public price?: number;
}
