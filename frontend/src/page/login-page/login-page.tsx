import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { loginAction } from '../../store/api-action/user-api-actions.ts';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (loginRef.current && passwordRef.current) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь?
              <Link className="login__link"
                to={AppRoute.Register}
              >Зарегистрируйтесь
              </Link> прямо сейчас
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input
                  ref={loginRef}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  required
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label>
                <span>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="• • • • • • • • • • • •"
                    id="passwordLogin"
                    name="password"
                    autoComplete="off"
                    required
                  />
                  <button className="input-login__button-eye"
                    type="button"
                  >
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium"
                type="submit"
              >Войти
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
