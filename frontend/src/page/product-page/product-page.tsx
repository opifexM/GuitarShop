import { Link } from 'react-router-dom';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { ProductFilter } from '../../component/product-filter/product-filter.tsx';
import { ProductList } from '../../component/product-list/product-list.tsx';
import { ProductPagination } from '../../component/product-pagination/product-pagination.tsx';
import { ProductSort } from '../../component/product-sort/product-sort.tsx';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hook';
import { getProduct } from '../../store/api-communication/api-communication.selectors.ts';

export function ProductPage() {
  const products = useAppSelector(getProduct);

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>Товары</Link>
              </li>
            </ul>
            <div className="catalog">
              <ProductFilter />
              <ProductSort />
              <ProductList products={products} />
            </div>
            <button className="button product-list__button button--red button--big">Добавить новый товар</button>
            <div className="pagination product-list__pagination">
              <ProductPagination />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
