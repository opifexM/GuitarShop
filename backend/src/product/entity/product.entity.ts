import { Entity } from 'shared/base/entity';
import { GuitarStringType } from 'shared/type/guitar-string-type.enum';
import { GuitarType } from 'shared/type/guitar-type.enum';
import { Product } from 'shared/type/product';

export class ProductEntity extends Entity implements Product {
  article: string;
  description: string;
  guitarStringType: GuitarStringType;
  guitarType: GuitarType;
  photoId: string;
  postedAt: Date;
  price: number;
  title: string;

  constructor(product?: Product) {
    super();
    this.fillUserData(product);
  }

  public fillUserData(product?: Product): void {
    if (!product) {
      return;
    }

    this.id = product.id ?? '';
    this.article = product.article;
    this.description = product.description;
    this.guitarStringType = product.guitarStringType;
    this.guitarType = product.guitarType;
    this.photoId = product.photoId;
    this.postedAt = product.postedAt;
    this.price = product.price;
    this.title = product.title;
  }

  public toPOJO() {
    return {
      id: this.id,
      article: this.article,
      description: this.description,
      guitarStringType: this.guitarStringType,
      guitarType: this.guitarType,
      photoId: this.photoId,
      postedAt: this.postedAt,
      price: this.price,
      title: this.title,
    };
  }
}
