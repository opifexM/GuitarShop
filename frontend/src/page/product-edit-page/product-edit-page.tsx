import { Link } from 'react-router-dom';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { AppRoute } from '../../const.ts';

export function ProductEditPage() {
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">СURT Z30 Plus</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Login}>Вход</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>Товары</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>Товары</Link>
              </li>
            </ul>
            {/* <ProductEdit/> */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
