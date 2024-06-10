import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum.ts';
import { GuitarType } from 'shared/type/product/guitar-type.enum.ts';

export function getGuitarStringTypeText(type: GuitarStringType): string {
  switch (type) {
    case GuitarStringType.FOUR:
      return '4-струнная';
    case GuitarStringType.SIX:
      return '6-струнная';
    case GuitarStringType.SEVEN:
      return '7-струнная';
    case GuitarStringType.TWELVE:
      return '12-струнная';
    default:
      return 'Неизвестный тип струн';
  }
}

export function getGuitarTypeText(type: GuitarType): string {
  switch (type) {
    case GuitarType.ELECTRO:
      return 'Электрогитара';
    case GuitarType.ACOUSTIC:
      return 'Акустическая гитара';
    case GuitarType.UKULELE:
      return 'Укулеле';
    default:
      return 'Неизвестный тип гитары';
  }
}
