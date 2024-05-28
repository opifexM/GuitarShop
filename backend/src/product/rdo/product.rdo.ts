import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GuitarStringType } from 'shared/type/guitar-string-type.enum';
import { GuitarType } from 'shared/type/guitar-type.enum';

export class ProductRdo {
  @ApiProperty({
    example: '6655fa9caba40a3fafedcea5',
    description: 'The unique identifier of the product',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    example: 'Fender Stratocaster',
    description: 'The title of the product',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    example: 'A classic guitar model known for its versatility and tone.',
    description: 'The description of the product',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    example: '2023-05-28T14:00:00Z',
    description: 'The date when the product was posted',
  })
  @Expose()
  public postedAt: Date;

  @ApiProperty({
    example: 'photo123',
    description: 'The ID of the photo associated with the product',
  })
  @Expose()
  public photoId: string;

  @ApiProperty({
    example: GuitarType.ELECTRO,
    description: 'The type of the guitar',
    enum: GuitarType,
  })
  @Expose()
  public guitarType: GuitarType;

  @ApiProperty({
    example: 'ART12345',
    description: 'The article of the product',
  })
  @Expose()
  public article: string;

  @ApiProperty({
    example: GuitarStringType.SIX,
    description: 'The type of strings used in the guitar',
    enum: GuitarStringType,
  })
  @Expose()
  public guitarStringType: GuitarStringType;

  @ApiProperty({
    example: 1500,
    description: 'The price of the product',
  })
  @Expose()
  public price: number;
}
