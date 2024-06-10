import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { ProductView } from '../../component/product-view/product-view.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchProductDetailAction } from '../../store/api-action/data-api-actions.ts';
import { getCurrentProduct } from '../../store/api-communication/api-communication.selectors.ts';

export function ProductViewPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(getCurrentProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetailAction(id));
    }
  }, [dispatch, id]);

  if (!id || !currentProduct) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{currentProduct.title}</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={`${AppRoute.Main }`}>Список</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={`${AppRoute.Main }`}>Товар</Link>
              </li>
            </ul>
            <span>⠀</span>
            <ProductView
              product={currentProduct}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
