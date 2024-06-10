import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { ProductFilter } from '../../component/product-filter/product-filter.tsx';
import { ProductList } from '../../component/product-list/product-list.tsx';
import { ProductPagination } from '../../component/product-pagination/product-pagination.tsx';
import { ProductSort } from '../../component/product-sort/product-sort.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchProductsAction } from '../../store/api-action/data-api-actions.ts';
import {
  getFilterGuitarStringTypes,
  getFilterGuitarTypes,
  getFilterPage,
  getProduct,
  getSortDirection,
  getSortType
} from '../../store/api-communication/api-communication.selectors.ts';

export function ProductPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProduct);
  const filterPage = useAppSelector(getFilterPage);
  const filterGuitarTypes = useAppSelector(getFilterGuitarTypes);
  const filterGuitarStringTypes = useAppSelector(getFilterGuitarStringTypes);
  const sortDirection = useAppSelector(getSortDirection);
  const sortType = useAppSelector(getSortType);

  useEffect(() => {
    dispatch(fetchProductsAction({
      page: filterPage,
      guitarType: filterGuitarTypes,
      guitarStringType: filterGuitarStringTypes,
      sortDirection: sortDirection,
      sortType: sortType
    }));
  }, [dispatch, filterPage, filterGuitarTypes, filterGuitarStringTypes, sortType, sortDirection]);

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
                <Link className="link" to={`${AppRoute.Main}`}>Список</Link>
              </li>
            </ul>
            <div className="catalog">
              <ProductFilter />
              <ProductSort />
              <ProductList products={products} />
            </div>
            <Link
              className="button product-list__button button--red button--big"
              to={AppRoute.ProductCreate}
            >Добавить новый товар
            </Link>
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
