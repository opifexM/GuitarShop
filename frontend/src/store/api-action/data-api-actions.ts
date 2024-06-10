import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CreateProductDto } from 'shared/type/product/dto/create-product.dto.ts';
import { ProductPaginationDto } from 'shared/type/product/dto/product-pagination.dto.ts';
import { ProductDto } from 'shared/type/product/dto/product.dto.ts';
import { UpdateProductDto } from 'shared/type/product/dto/update-product.dto.ts';
import { ProductQuery } from 'shared/type/product/product.query.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../services/api-error-handler.ts';
import { ThunkApiConfig } from '../state.ts';

export const fetchProductsAction = createAsyncThunk<
  ProductPaginationDto,
  ProductQuery,
  ThunkApiConfig
>(
  'data/fetchProductsAction',
  async (searchQuery, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<ProductPaginationDto>(APIRoute.GetProductList, {
        params: searchQuery
      });

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right'
      });
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchProductDetailAction = createAsyncThunk<
  ProductDto,
  string,
  ThunkApiConfig
>(
  'data/fetchProductDetailAction',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.GetProduct.replace(':productId', id);
      const { data } = await api.get<ProductDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right'
      });
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const updateProductAction = createAsyncThunk<
  ProductDto,
  {
    productData: UpdateProductDto;
    id: string;
  },
  ThunkApiConfig
>(
  'data/updateProductAction',
  async ({ productData, id }, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.UpdateProduct.replace(':productId', id);
      const { data } = await api.patch<ProductDto>(url, productData);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right'
      });
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const createProductAction = createAsyncThunk<
  ProductDto,
  CreateProductDto,
  ThunkApiConfig
>(
  'data/createProductAction',
  async (productData, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<ProductDto>(APIRoute.CreateProduct, productData);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right'
      });
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteProductAction = createAsyncThunk<
  ProductDto,
  string,
  ThunkApiConfig
>
(
  'data/deleteProductAction',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const url = APIRoute.DeleteProduct.replace(':productId', id);
      const { data } = await api.delete<ProductDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right'
      });
      return rejectWithValue(handleApiError(error));
    }
  }
);
