import { ComponentType, useEffect } from 'react';
import { BrowserRouter, BrowserRouterProps, MemoryRouterProps, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './component/private-route/private-route.tsx';
import { AppRoute, AuthorizationStatus } from './const.ts';
import { useAppDispatch, useAppSelector } from './hook';
import { LoginPage } from './page/login-page/login-page.tsx';
import { NotFoundPage } from './page/not-found-page/not-found-page.tsx';
import { ProductCreatePage } from './page/product-create-page/product-create-page.tsx';
import { ProductDeletePage } from './page/product-delete-page/product-delete-page.tsx';
import { ProductEditPage } from './page/product-edit-page/product-edit-page.tsx';
import { ProductPage } from './page/product-page/product-page.tsx';
import { ProductViewPage } from './page/product-view-page/product-view-page.tsx';
import { RegistrationPage } from './page/registration-page/registration-page.tsx';
import { checkAuthAction } from './store/api-action/user-api-actions.ts';
import { getAuthorizationStatus } from './store/api-communication/api-communication.selectors.ts';

type CustomRouterProps = BrowserRouterProps | MemoryRouterProps;

interface AppProps {
  RouterComponent?: ComponentType<CustomRouterProps>;
  routerProps?: CustomRouterProps;
}

export function App({ RouterComponent = BrowserRouter, routerProps = {} }: Readonly<AppProps>) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    <RouterComponent {...routerProps}>
      <Routes>
        <Route path={AppRoute.Main}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Login}
            >
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
              declinedElement={AppRoute.Main}
            >
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Register}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.NoAuth}
              declinedElement={AppRoute.Main}
            >
              <RegistrationPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.ProductCreate}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Login}
            >
              <ProductCreatePage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.ProductId}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Login}
            >
              <ProductViewPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.ProductIdEdit}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Login}
            >
              <ProductEditPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.ProductIdDelete}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
              requiredAuthorizationStatus={AuthorizationStatus.Auth}
              declinedElement={AppRoute.Login}
            >
              <ProductDeletePage />
            </PrivateRoute>
          }
        />
        <Route path="*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </RouterComponent>
  );
}
