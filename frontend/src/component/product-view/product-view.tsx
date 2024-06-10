import { useState } from 'react';
import { Product } from 'shared/type/product/product.ts';
import { getGuitarStringTypeText, getGuitarTypeText } from '../../store/services/util.ts';
import classNames from 'classnames';

interface ProductViewProps {
  product: Product;
}

export function ProductView({ product }: Readonly<ProductViewProps>) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const { photoId, article, guitarType, guitarStringType, description, title } = product;
  const photoIdParts = photoId.split('.');
  const photoFileName = photoIdParts[0] ?? '';
  const photoFileExtension = photoIdParts[1] ?? '';
  const guitarTypeText = getGuitarTypeText(guitarType);
  const guitarStringTypeText = getGuitarStringTypeText(guitarStringType);

  const handleDescriptionToggle = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <div className="product-container">
      <img className="product-container__img"
        src={`/img/content/${photoFileName}.${photoFileExtension}`}
        srcSet={`/img/content/${photoFileName}@2x.${photoFileExtension} 2x`}
        width="90"
        height="235"
        alt=""
      />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{title}</h2>
        <br />
        <br />
        <div className="tabs">
          <p
            className={classNames('button', 'button--medium', 'tabs__button', {'button--black-border': isDescriptionVisible })}
            onClick={handleDescriptionToggle}
          >Характеристики
          </p>
          <p
            className={classNames('button', 'button--medium', 'tabs__button', {'button--black-border': !isDescriptionVisible })}
            onClick={handleDescriptionToggle}
          >Описание
          </p>
          <div className="tabs__content" id="characteristics">
            <table className={classNames('tabs__table', { 'hidden': isDescriptionVisible })}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{article}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{guitarTypeText}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{guitarStringTypeText}</td>
                </tr>
              </tbody>
            </table>
            <p className={classNames('tabs__product-description', { 'hidden': !isDescriptionVisible })}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
