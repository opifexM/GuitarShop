import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ProductPaginationDto } from 'shared/type/product/dto/product-pagination.dto.ts';
import { ProductDto } from 'shared/type/product/dto/product.dto.ts';
import { APIRoute } from '../../const.ts';
import { handleApiError } from '../services/api-error-handler.ts';
import { ThunkApiConfig } from '../state.ts';

export const fetchProductsAction = createAsyncThunk<
  ProductPaginationDto,
  undefined,
  ThunkApiConfig
>(
  'data/fetchProductsAction',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<ProductPaginationDto>(APIRoute.GetProductList);

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
  async (id, {extra: api, rejectWithValue}) => {
    try {
      const url = APIRoute.GetProduct.replace(':productId', id);
      const {data} = await api.get<ProductDto>(url);

      return data;
    } catch (error) {
      toast.warning(handleApiError(error), {
        position: 'top-right'
      });
      return rejectWithValue(handleApiError(error));
    }
  }
);


