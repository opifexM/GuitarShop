import { SortDirection } from 'shared/type/sort-direction.interface.ts';
import { SortType } from 'shared/type/sort-type.enum.ts';

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  User: '/user',
  UserId: '/user/:id',
  Product: '/product',
  ProductCreate: '/product/create',
  ProductId: '/product/:id',
  ProductIdEdit: '/product/:id/edit',
  ProductIdDelete: '/product/:id/delete',
} as const;
export type AppRouteType = typeof AppRoute[keyof typeof AppRoute];

export const APIRoute = {
  CreateUser: 'users',
  GetUser: 'users/:userId',
  UpdateUser: 'users/:userId',
  DeleteUser: 'users/:userId',
  Login: 'users/login',
  CheckAuth: 'users/check',
  CreateProduct: 'products',
  GetProductList: 'products',
  GetProduct: 'products/:productId',
  UpdateProduct: 'products/:productId',
  DeleteProduct: 'products/:productId'
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN'
} as const;
export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export const NameSpace = {
  SessionState: 'SESSION_STATE',
  ApiCommunication: 'API_COMMUNICATION',
  UserPreferences: 'USER_PREFERENCES'
} as const;

export const BACKEND_URL = 'http://localhost:3000/api';
export const BACKEND_REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'guitar-shop-token';
export const DEFAULT_SORT_TYPE = SortType.BY_DATE;
export const DEFAULT_SORT_DIRECTION = SortDirection.ASC;
export const DEFAULT_FILTER_PAGE = 1;
