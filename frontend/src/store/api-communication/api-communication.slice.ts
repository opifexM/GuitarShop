import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuitarStringType } from 'shared/type/product/guitar-string-type.enum.ts';
import { GuitarType } from 'shared/type/product/guitar-type.enum.ts';
import { Product } from 'shared/type/product/product.ts';
import { SortDirection } from 'shared/type/sort-direction.interface.ts';
import { SortType } from 'shared/type/sort-type.enum.ts';
import {
  AuthorizationStatus,
  AuthorizationStatusType,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
  NameSpace
} from '../../const.ts';
import {
  createProductAction,
  deleteProductAction,
  fetchProductDetailAction,
  fetchProductsAction,
  updateProductAction
} from '../api-action/data-api-actions.ts';
import { checkAuthAction, loginAction, registerAction } from '../api-action/user-api-actions.ts';
import { dropToken, saveToken } from '../services/token.ts';

interface ApiCommunicationState {
  products: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  userName: string;
  userLogin: string;
  userId: string;
  authorizationStatus: AuthorizationStatusType;
  filterPage: number | undefined;
  filterLimit: number | undefined;
  filterGuitarTypes: GuitarType[] | undefined;
  filterGuitarStringTypes: GuitarStringType[] | undefined;
  sortDirection: SortDirection | undefined;
  sortType: SortType | undefined;
  paginationTotalPages: number;
  paginationCurrentPage: number;
}

const initialState: ApiCommunicationState = {
  products: [],
  currentProduct: null,
  isLoading: false,
  userName: '',
  userLogin: '',
  userId: '',
  authorizationStatus: AuthorizationStatus.Unknown,
  filterPage: undefined,
  filterLimit: undefined,
  filterGuitarTypes: undefined,
  filterGuitarStringTypes: undefined,
  sortDirection: DEFAULT_SORT_DIRECTION,
  sortType: DEFAULT_SORT_TYPE,
  paginationTotalPages: 0,
  paginationCurrentPage: 0,
};

export const apiCommunicationSlice = createSlice({
  name: NameSpace.ApiCommunication,
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
    setFilterPage: (state, action: PayloadAction<number>) => {
      state.filterPage = action.payload;
    },
    setFilterLimit: (state, action: PayloadAction<number>) => {
      state.filterLimit = action.payload;
    },
    setFilterGuitarTypes: (state, action: PayloadAction<GuitarType[]>) => {
      state.filterGuitarTypes = action.payload;
    },
    setFilterGuitarStringTypes: (state, action: PayloadAction<GuitarStringType[]>) => {
      state.filterGuitarStringTypes = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAction.rejected, (state) => {
        dropToken();
        state.userLogin = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })
      .addCase(registerAction.fulfilled, (state) => {
        dropToken();
        state.userLogin = '';
        state.userId = '';
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoading = false;
      })

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
        state.products = [];
        state.paginationCurrentPage = 0;
        state.paginationTotalPages = 0;
        state.isLoading = false;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload.entities;
        state.paginationCurrentPage = action.payload.currentPage;
        state.paginationTotalPages = action.payload.totalPages;
        state.isLoading = false;
      })

      .addCase(fetchProductDetailAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetailAction.rejected, (state) => {
        state.currentProduct = null;
        state.isLoading = false;
      })
      .addCase(fetchProductDetailAction.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isLoading = false;
      })

      .addCase(updateProductAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isLoading = false;
      })

      .addCase(deleteProductAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProductAction.fulfilled, (state) => {
        state.currentProduct = null;
        state.isLoading = false;
      })

      .addCase(createProductAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isLoading = false;
      });
  }
});

export const {
  resetAuthStatus,
  setFilterGuitarTypes,
  setFilterGuitarStringTypes,
  setFilterPage,
  setSortDirection,
  setSortType
} = apiCommunicationSlice.actions;
