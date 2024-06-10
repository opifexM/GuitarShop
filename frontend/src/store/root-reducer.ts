import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import { apiCommunicationSlice } from './api-communication/api-communication.slice.ts';

export const rootReducer = combineReducers({
  // [NameSpace.SessionState]: uiSettingsSlice.reducer,
  [NameSpace.ApiCommunication]: apiCommunicationSlice.reducer,
  // [NameSpace.UserPreferences]: userPreferencesSlice.reducer,
});
