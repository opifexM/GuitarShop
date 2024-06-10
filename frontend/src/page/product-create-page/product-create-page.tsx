import { Link } from 'react-router-dom';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum.ts';
import { GuitarType } from 'shared/type/product/guitar-type.enum.ts';
import { Product } from 'shared/type/product/product.ts';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { ProductEdit } from '../../component/product-edit/product-edit.tsx';
import { AppRoute } from '../../const.ts';

export function ProductCreatePage() {
  const newProduct: Product = {
    postedAt: new Date(),
    title: 'New product name',
    description: 'New description of new product',
    photoId: 'add-item-1.png',
    guitarType: GuitarType.ACOUSTIC,
    article: 'abcd123456',
    guitarStringType: GuitarStringType.FOUR,
    price: 100
  };

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{newProduct.title}</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={`${AppRoute.Main}`}>Список</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={`${AppRoute.Main}`}>Товар</Link>
              </li>
            </ul>
            <ProductEdit
              product={newProduct}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
