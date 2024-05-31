import { Link } from 'react-router-dom';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { AppRoute } from '../../const.ts';

export function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
            <Link className="button button__error button--small button--black-border"
              to={AppRoute.Main}
            >Продолжить покупки
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
