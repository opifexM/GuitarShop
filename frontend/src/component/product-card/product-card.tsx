import { Link } from 'react-router-dom';
import { Product } from 'shared/type/product/product.ts';
import { AppRoute } from '../../const.ts';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  const { photoId, title, postedAt, price, id } = product;

  const productRoute = `${AppRoute.Product}/${id}`;
  const productEditRoute = `${AppRoute.Product}/${id}/edit`;
  const productDeleteRoute = `${AppRoute.Product}/${id}/delete`;
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
      <div className="catalog-item__data">
        <img src={`img/content/${photoFileName}.${photoFileExtension}`}
          srcSet={`img/content/${photoFileName}@2x.${photoFileExtension} 2x`}
          width="36"
          height="93"
          alt={title}
        />
        <div className="catalog-item__data-wrapper">
          <Link
            className="link"
            to={productRoute}
          >
            <p className="catalog-item__data-title">{title}</p>
          </Link>
          <br />
          <p className="catalog-item__data-date">{`Дата добавления ${formattedDate}`}</p>
          <p className="catalog-item__data-price">{`${formattedPrice} ₽`}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          to={productEditRoute}
          className="button button--small button--black-border"
          aria-label="Редактировать товар"
        >Редактировать
        </Link>
        <Link
          to={productDeleteRoute}
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
        >Удалить
        </Link>
      </div>
    </li>
  );
}
