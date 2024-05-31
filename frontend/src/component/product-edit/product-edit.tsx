import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum.ts';
import { GuitarType } from 'shared/type/product/guitar-type.enum.ts';
import { Product } from 'shared/type/product/product.ts';

interface ProductEditProps {
  product: Product;
}

export function ProductEdit({ product }: Readonly<ProductEditProps>) {
  const { photoId, title, postedAt, price, article, description, guitarType, guitarStringType } = product;
  const photoIdParts = photoId.split('.');
  const photoFileName = photoIdParts[0] ?? '';
  const photoFileExtension = photoIdParts[1] ?? '';
  const formattedDate = new Date(postedAt).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <form className="edit-item__form" action="#" method="get">
      <div className="edit-item__form-left">
        <div className="edit-item-image edit-item__form-image">
          <div className="edit-item-image__image-wrap">
            <img className="edit-item-image__image"
              src={`img/content/${photoFileName}.${photoFileExtension}`}
              srcSet={`img/content/${photoFileName}@2x.${photoFileExtension} 2x`} width="133"
              height="332" alt={title}
            />
          </div>
          <div className="edit-item-image__btn-wrap">
            <button className="button button--small button--black-border edit-item-image__btn">Заменить</button>
            <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
          </div>
        </div>
        <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
          <input type="radio"
            id="guitar"
            name="item-type"
            value="guitar"
            checked={guitarType === GuitarType.ACOUSTIC}
          />
          <label htmlFor="guitar">Акустическая гитара</label>
          <input type="radio"
            id="el-guitar"
            name="item-type"
            value="el-guitar"
            checked={guitarType === GuitarType.ELECTRO}
          />
          <label htmlFor="el-guitar">Электрогитара</label>
          <input type="radio"
            id="ukulele"
            name="item-type"
            value="ukulele"
            checked={guitarType === GuitarType.UKULELE}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
        <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
          <input type="radio"
            id="string-qty-4"
            name="string-qty"
            value="4"
            checked={guitarStringType === GuitarStringType.FOUR}
          />
          <label htmlFor="string-qty-4">4</label>
          <input type="radio"
            id="string-qty-6"
            name="string-qty"
            value="6"
            checked={guitarStringType === GuitarStringType.SIX}
          />
          <label htmlFor="string-qty-6">6</label>
          <input type="radio"
            id="string-qty-7"
            name="string-qty"
            value="7"
            checked={guitarStringType === GuitarStringType.SEVEN}
          />
          <label htmlFor="string-qty-7">7</label>
          <input type="radio"
            id="string-qty-12"
            name="string-qty"
            value="12"
            checked={guitarStringType === GuitarStringType.TWELVE}
          />
          <label htmlFor="string-qty-12">12</label>
        </div>
      </div>
      <div className="edit-item__form-right">
        <div className="custom-input edit-item__form-input">
          <label><span>Дата добавления товара</span>
            <input type="text" name="date" value={formattedDate} placeholder="Дата в формате 00.00.0000" readOnly />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input">
          <label><span>Наименование товара</span>
            <input type="text" name="title" value={title} placeholder="Наименование" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input edit-item__form-input--price">
          <label><span>Цена товара</span>
            <input type="text" name="price" value={price} placeholder="Цена в формате 00 000" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input">
          <label><span>Артикул товара</span>
            <input type="text" name="sku" value={article} placeholder="Артикул товара" />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea edit-item__form-textarea">
          <label><span>Описание товара</span>
            <textarea name="description" placeholder="">{description}</textarea>
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className="edit-item__form-buttons-wrap">
        <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
        <button className="button button--small edit-item__form-button" type="button">Вернуться к списку товаров
        </button>
      </div>
    </form>
  );
}
