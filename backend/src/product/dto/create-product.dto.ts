import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { GuitarStringType } from 'shared/type/guitar-string-type.enum';
import { GuitarType } from 'shared/type/guitar-type.enum';
import { PRODUCT } from '../entity/product.constant';

export class CreateProductDto {
  @IsString()
  @Length(PRODUCT.TITLE.MIN, PRODUCT.TITLE.MAX)
  @ApiProperty({
    example: 'Fender Stratocaster',
    description: 'The title of the product',
    minLength: PRODUCT.TITLE.MIN,
    maxLength: PRODUCT.TITLE.MAX,
  })
  public title: string;

  @IsString()
  @Length(PRODUCT.DESCRIPTION.MIN, PRODUCT.DESCRIPTION.MAX)
  @ApiProperty({
    example: 'A classic guitar model known for its versatility and tone.',
    description: 'The description of the product',
    minLength: PRODUCT.DESCRIPTION.MIN,
    maxLength: PRODUCT.DESCRIPTION.MAX,
  })
  public description: string;

  @IsString()
  @ApiProperty({
    example: 'photo123',
    description: 'The ID of the photo associated with the product',
  })
  public photoId: string;

  @IsEnum(GuitarType)
  @ApiProperty({
    example: GuitarType.ELECTRO,
    description: 'The type of the guitar',
    enum: GuitarType,
  })
  public guitarType: GuitarType;

  @IsString()
  @Length(PRODUCT.ARTICLE.MIN, PRODUCT.ARTICLE.MAX)
  @ApiProperty({
    example: 'ART12345',
    description: 'The article of the product',
    minLength: PRODUCT.ARTICLE.MIN,
    maxLength: PRODUCT.ARTICLE.MAX,
  })
  public article: string;

  @IsEnum(GuitarStringType)
  @ApiProperty({
    example: GuitarStringType.SIX,
    description: 'The type of strings used in the guitar',
    enum: GuitarStringType,
  })
  public guitarStringType: GuitarStringType;

  @IsNumber()
  @Min(PRODUCT.PRICE.MIN)
  @Max(PRODUCT.PRICE.MAX)
  @ApiProperty({
    example: 1500,
    description: 'The price of the product',
    minimum: PRODUCT.PRICE.MIN,
    maximum: PRODUCT.PRICE.MAX,
  })
  public price: number;
}
