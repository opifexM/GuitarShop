import { NameSpace } from '../../const.ts';
import { State } from '../state.ts';

export const getProduct = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].products;
export const getCurrentProduct = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentProduct;
export const getIsLoading = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].isLoading;
export const getAuthorizationStatus = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].authorizationStatus;
export const getUserName = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].userName;
export const getUserLogin = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].userLogin;
export const getFilterPage = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].filterPage;
export const getFilterGuitarTypes = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].filterGuitarTypes;
export const getFilterGuitarStringTypes = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].filterGuitarStringTypes;
export const getSortDirection = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].sortDirection;
export const getSortType = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].sortType;
export const getPaginationTotalPages = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].paginationTotalPages;
export const getPaginationCurrentPage = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].paginationCurrentPage;
