import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

export function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Main}>
            <img alt="Логотип"
              className="logo__img"
              height="70"
              src="./img/svg/logo.svg"
              width="70"
            />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item"><a className="link main-nav__link" href="#">Каталог</a>
              </li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
              </li>
              <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
              </li>
            </ul>
          </nav>
          <div className="header__container"><span className="header__user-name">Имя</span>
            <Link
              aria-label="Перейти в личный кабинет"
              className="header__link"
              to={AppRoute.Login}
            >
              <svg aria-hidden="true" className="header__link-icon" height="14" width="12">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
