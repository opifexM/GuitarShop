import { GuitarStringType } from './guitar-string-type.enum';
import { GuitarType } from './guitar-type.enum';

export interface Product {
  id?: string;
  title: string;
  description: string;
  postedAt: Date;
  photoId: string;
  guitarType: GuitarType;
  article: string;
  guitarStringType: GuitarStringType;
  price: number;
}