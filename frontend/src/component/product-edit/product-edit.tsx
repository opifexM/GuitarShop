import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum.ts';
import { GuitarType } from 'shared/type/product/guitar-type.enum.ts';
import { Product } from 'shared/type/product/product.ts';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { createProductAction, updateProductAction } from '../../store/api-action/data-api-actions.ts';

interface ProductEditProps {
  product: Product;
  id?: string;
}

export function ProductEdit({ product, id }: Readonly<ProductEditProps>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { photoId, postedAt } = product;
  const photoIdParts = photoId.split('.');
  const photoFileName = photoIdParts[0] ?? '';
  const photoFileExtension = photoIdParts[1] ?? '';
  const formattedDate = new Date(postedAt).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    photoId: product?.photoId || '',
    guitarType: product?.guitarType || GuitarType.ACOUSTIC,
    article: product?.article || '',
    guitarStringType: product?.guitarStringType || GuitarStringType.FOUR,
    price: product?.price || 0
  });

  const handleFieldChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelClick = () => {
    navigate(AppRoute.Main);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (id) {
      dispatch(updateProductAction({
        id: id,
        productData: {
          title: formData.title,
          description: formData.description,
          photoId: formData.photoId,
          guitarType: formData.guitarType,
          article: formData.article,
          guitarStringType: Number(formData.guitarStringType),
          price: Number.parseFloat(String(formData.price))
        }
      }))
        .unwrap()
        .then(() => {
          toast.success(`Product '${formData.title}' updated`, {
            position: 'top-right'
          });
          toast.info('You can return to the list of products or continue editing', {
            position: 'top-right'
          });
        })
        .catch(() => {
          toast.error('Updating failed. Please try again.', {
            position: 'top-right'
          });
        });
    } else {
      dispatch(createProductAction({
        title: formData.title,
        description: formData.description,
        photoId: formData.photoId,
        guitarType: formData.guitarType,
        article: formData.article,
        guitarStringType: Number(formData.guitarStringType),
        price: Number.parseFloat(String(formData.price))
      }))
        .unwrap()
        .then(() => {
          toast.success(`Product '${formData.title}' created`, {
            position: 'top-right'
          });
          navigate(AppRoute.Main);
        })
        .catch(() => {
          toast.error('Creating failed. Please try again.', {
            position: 'top-right'
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-item__form">
      <div className="edit-item__form-left">
        <div className="edit-item-image edit-item__form-image">
          <div className="edit-item-image__image-wrap">
            <img className="edit-item-image__image"
              src={`/img/content/${photoFileName}.${photoFileExtension}`}
              srcSet={`/img/content/${photoFileName}@2x.${photoFileExtension} 2x`} width="133"
              height="332" alt={formData.title}
            />
          </div>
          <div className="edit-item-image__btn-wrap">
            <button className="button button--small button--black-border edit-item-image__btn" disabled>Заменить</button>
            <button className="button button--small button--black-border edit-item-image__btn" disabled>Удалить</button>
          </div>
        </div>
        <div className="input-radio edit-item__form-radio"><span>Тип товара</span>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="guitar"
            name="guitarType"
            value={GuitarType.ACOUSTIC}
            checked={formData.guitarType === GuitarType.ACOUSTIC}
          />
          <label htmlFor="guitar">Акустическая гитара</label>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="el-guitar"
            name="guitarType"
            value={GuitarType.ELECTRO}
            checked={formData.guitarType === GuitarType.ELECTRO}
          />
          <label htmlFor="el-guitar">Электрогитара</label>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="ukulele"
            name="guitarType"
            value={GuitarType.UKULELE}
            checked={formData.guitarType === GuitarType.UKULELE}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
        <div className="input-radio edit-item__form-radio"><span>Количество струн</span>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="string-qty-4"
            value={GuitarStringType.FOUR}
            name="guitarStringType"
            checked={formData.guitarStringType.toString() === GuitarStringType.FOUR.toString()}
          />
          <label htmlFor="string-qty-4">4</label>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="string-qty-6"
            value={GuitarStringType.SIX}
            name="guitarStringType"
            checked={formData.guitarStringType.toString() === GuitarStringType.SIX.toString()}
          />
          <label htmlFor="string-qty-6">6</label>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="string-qty-7"
            value={GuitarStringType.SEVEN}
            name="guitarStringType"
            checked={formData.guitarStringType.toString() === GuitarStringType.SEVEN.toString()}
          />
          <label htmlFor="string-qty-7">7</label>
          <input
            onChange={handleFieldChange}
            type="radio"
            id="string-qty-12"
            value={GuitarStringType.TWELVE}
            name="guitarStringType"
            checked={formData.guitarStringType.toString() === GuitarStringType.TWELVE.toString()}
          />
          <label htmlFor="string-qty-12">12</label>
        </div>
      </div>
      <div className="edit-item__form-right">
        <div className="custom-input edit-item__form-input">
          <label><span>Дата добавления товара</span>
            <input
              onChange={handleFieldChange}
              value={formattedDate}
              type="text"
              name="date"
              placeholder="Дата в формате 00.00.0000"
              readOnly
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input">
          <label><span>Наименование товара</span>
            <input
              onChange={handleFieldChange}
              value={formData.title}
              type="text"
              name="title"
              placeholder="Наименование"
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input edit-item__form-input--price">
          <label><span>Цена товара</span>
            <input
              onChange={handleFieldChange}
              value={formData.price}
              type="text"
              name="price"
              placeholder="Цена в формате 00 000"
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-input edit-item__form-input">
          <label><span>Артикул товара</span>
            <input
              onChange={handleFieldChange}
              value={formData.article}
              type="text"
              name="article"
              placeholder="Артикул товара"
            />
          </label>
          <p>Заполните поле</p>
        </div>
        <div className="custom-textarea edit-item__form-textarea">
          <label><span>Описание товара</span>
            <textarea
              onChange={handleFieldChange}
              value={formData.description}
              name="description"
              placeholder=""
            />
          </label>
          <p>Заполните поле</p>
        </div>
      </div>
      <div className="edit-item__form-buttons-wrap">
        <button className="button button--small edit-item__form-button"
          type="submit"
        >Сохранить изменения
        </button>
        <button
          className="button button--small edit-item__form-button"
          type="button"
          onClick={handleCancelClick}
        >Вернуться к списку товаров
        </button>
      </div>
    </form>
  );
}
