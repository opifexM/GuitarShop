import {NameSpace} from '../../const.ts';
import {State} from '../state.ts';

export const getProduct = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].products;
export const getCurrentProduct = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].currentProduct;
export const getIsLoading = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].isLoading;
export const getAuthorizationStatus = (state: Pick<State, typeof NameSpace.ApiCommunication>) => state[NameSpace.ApiCommunication].authorizationStatus;
