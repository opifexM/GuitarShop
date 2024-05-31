import { Product } from 'shared/type/product/product.ts';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  const {photoId, title, postedAt, price} = product;
  const photoIdParts = photoId.split('.');
  const photoFileName = photoIdParts[0] ?? '';
  const photoFileExtension = photoIdParts[1] ?? '';
  const formattedDate = new Date(postedAt).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedPrice = price.toLocaleString('ru-RU');

  return (
    <li className="catalog-item">
      <div className="catalog-item__data"><img src={`img/content/${photoFileName}.${photoFileExtension}`}
        srcSet={`img/content/${photoFileName}@2x.${photoFileExtension} 2x`} width="36"
        height="93" alt={title}
      />
      <div className="catalog-item__data-wrapper">
        <a className="link" href="./product.html"><p className="catalog-item__data-title">{title}</p></a>
        <br />
        <p className="catalog-item__data-date">{`Дата добавления ${formattedDate}`}</p>
        <p className="catalog-item__data-price">{`${formattedPrice} ₽`}</p>
      </div>
      </div>
      <div className="catalog-item__buttons">
        <a className="button button--small button--black-border"
          href="edit-item.html"
          aria-label="Редактировать товар"
        >Редактировать
        </a>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить
        </button>
      </div>
    </li>
  );
}
