import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hook';
import {
  getAuthorizationStatus,
  getUserLogin,
  getUserName
} from '../../store/api-communication/api-communication.selectors.ts';
import { resetAuthStatus } from '../../store/api-communication/api-communication.slice.ts';
import { dropToken } from '../../store/services/token.ts';

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userName = useAppSelector(getUserName);
  const userLogin = useAppSelector(getUserLogin);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  function handleLogoutClick() {
    dropToken();
    dispatch(resetAuthStatus());
    toast.success(`User '${userLogin}' logout`, {
      position: 'top-right'
    });
    navigate(AppRoute.Login);
  }

  const headerContainer = authorizationStatus ===
  AuthorizationStatus.Auth ? (
      <div className="header__container">
        <span className="header__user-name">Имя</span>
        <p
          onClick={handleLogoutClick}
          aria-label="Выход"
          className="header__link"
        >
          <svg aria-hidden="true" className="header__link-icon" height="14" width="12">
            <use xlinkHref="#icon-account"></use>
          </svg>
          <span className="header__link-text">Выход</span>
          {`    ${userName} - ${userLogin}`}
        </p>
      </div>
    ) : (
      <div className="header__container">
        <span className="header__user-name">Имя</span>
        <Link
          aria-label="Войти"
          className="header__link"
          to={AppRoute.Login}
        >
          <svg aria-hidden="true" className="header__link-icon" height="14" width="12">
            <use xlinkHref="#icon-account"></use>
          </svg>
          <span className="header__link-text">Вход</span>
        </Link>
      </div>
    );

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.Main}>
            <img alt="Логотип"
              className="logo__img"
              height="70"
              src="/img/svg/logo.svg"
              width="70"
            />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.Main}>Каталог</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.Main}>Где купить?</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.Main}>О компании</Link>
              </li>
            </ul>
          </nav>
          {headerContainer}
        </div>
      </div>
    </header>
  );
}
