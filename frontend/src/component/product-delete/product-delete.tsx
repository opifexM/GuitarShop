import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Product } from 'shared/type/product/product.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { deleteProductAction } from '../../store/api-action/data-api-actions.ts';
import { getGuitarStringTypeText, getGuitarTypeText } from '../../store/services/util.ts';

interface ProductDeleteProps {
  product: Product;
  id: string;
}

export function ProductDelete({ product, id }: Readonly<ProductDeleteProps>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { photoId, article, guitarType, guitarStringType, title, price } = product;
  const photoIdParts = photoId.split('.');
  const photoFileName = photoIdParts[0] ?? '';
  const photoFileExtension = photoIdParts[1] ?? '';
  const guitarTypeText = getGuitarTypeText(guitarType);
  const guitarStringTypeText = getGuitarStringTypeText(guitarStringType);

  const divStyle: React.CSSProperties = {
    position: 'relative',
    width: '550px',
    height: '440px',
    marginBottom: '50px'
  };

  function handleClickDeleteButton() {
    dispatch(deleteProductAction(id))
      .unwrap()
      .then(() => {
        toast.success(`Product '${title}' deleted`, {
          position: 'top-right'
        });
        navigate(AppRoute.Main);
      })
      .catch(() => {
        toast.error('Deleted failed. Please try again.', {
          position: 'top-right'
        });
      });
  }

  return (
    <div style={divStyle}>
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal=""></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info">
              <img className="edit-item-image__image"
                src={`/img/content/${photoFileName}.${photoFileExtension}`}
                srcSet={`/img/content/${photoFileName}@2x.${photoFileExtension} 2x`} width="133"
                height="332" alt={title}
              />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">{title}</h3>
                <p className="modal__product-params modal__product-params--margin-11">{`Артикул: ${article}`}</p>
                <p className="modal__product-params">{`${guitarStringTypeText}, ${guitarTypeText}`}</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">${price} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                className="button button--small modal__button"
                onClick={handleClickDeleteButton}
              >Удалить товар
              </button>
              <Link
                className="button button--black-border button--small modal__button modal__button--right"
                to={AppRoute.Main}
              >Список товаров
              </Link>
            </div>
            <Link className="modal__close-btn button-cross"
              to={AppRoute.Main}
              type="button"
              aria-label="Закрыть"
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
