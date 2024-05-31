import { createSlice } from '@reduxjs/toolkit';
import { Product } from 'shared/type/product/product.ts';
import { AuthorizationStatus, AuthorizationStatusType, NameSpace } from '../../const.ts';
import { fetchProductsAction } from '../api-action/data-api-actions.ts';
import { checkAuthAction, loginAction } from '../api-action/user-api-actions.ts';
import { dropToken, saveToken } from '../services/token.ts';

interface ApiCommunicationState {
  products: Product[];
  isLoading: boolean;
  userName: string;
  userLogin: string;
  userId: string;
  authorizationStatus: AuthorizationStatusType;
}

const initialState: ApiCommunicationState = {
  products: [],
  isLoading: false,
  userName: '',
  userLogin: '',
  userId: '',
  authorizationStatus: AuthorizationStatus.Unknown
};

export const apiCommunicationSlice = createSlice({
  name: NameSpace.ApiCommunication,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.rejected, (state) => {
        dropToken();
        state.userLogin = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { id, email, accessToken } = action.payload;
        saveToken(accessToken);
        state.userLogin = email;
        state.userId = id;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        dropToken();
        state.userLogin = '';
        state.userName = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        const { sub, email, name } = action.payload;
        state.userLogin = email;
        state.userName = name;
        state.userId = sub;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoading = false;
      })

      .addCase(fetchProductsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload.entities;
        state.isLoading = false;
      });
  }
});

export const {} = apiCommunicationSlice.actions;
