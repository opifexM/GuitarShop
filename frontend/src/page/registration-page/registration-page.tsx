import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Footer } from '../../component/footer/footer.tsx';
import { Header } from '../../component/header/header.tsx';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hook';
import { registerAction } from '../../store/api-action/user-api-actions.ts';

export function RegistrationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (loginRef.current && passwordRef.current && nameRef.current) {
      dispatch(registerAction({
        email: loginRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value
      })).then(() => {
        toast.success('Registration is successful', {
          position: 'top-right'
        });
        toast.info('Please log in', {
          position: 'top-right'
        });
        navigate(AppRoute.Login);
      });
    }
  };

  return (
    <>
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input
                  ref={nameRef}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  required
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
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
                <label htmlFor="password">Придумайте пароль</label>
                <span>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="• • • • • • • • • • • •"
                    id="password"
                    name="password"
                    autoComplete="off"
                    required
                  />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button>
                </span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium"
                type="submit"
              >Зарегистрироваться
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
