import { RootState } from '../../../store';
import { createSelector } from '@reduxjs/toolkit';
import groupBy from 'lodash/groupBy';

export const selectItems = (state: RootState) => state.indicators.byId;
export const selectErrorMessage = (state: RootState) => state.indicators.error;
export const selectIsConnected = (state: RootState) =>
  state.indicators.sseConnection;
export const selectItemsByGroups = createSelector(selectItems,(arr)=>groupBy(arr,(item)=>item.type));
