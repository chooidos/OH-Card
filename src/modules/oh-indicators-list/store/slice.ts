import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { getAllItems } from './actions';

export interface IState {
  byId: Record<string, IOpenhabItem>;
  ids: string[];
  isConnected: boolean;
  error: string | null;
}

export const indicatorsSlice = createSlice<IState, any>({
  name: 'indicatorsSlice',
  initialState: {
    byId: {},
    ids: [],
    isConnected: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllItems.fulfilled,
        (state, action: PayloadAction<IOpenhabItem[]>) => {
          state.byId = action.payload.reduce(
            (items, item) => ({
              ...items,
              [item.name as string]: item as IOpenhabItem,
            }),
            {},
          );
          state.ids = action.payload.map(({ name }) => name);
        },
      )
      .addCase(
        getAllItems.rejected,
        (state, action: PayloadAction<any, any>) => {
          state.error = (action as any).error.message;
        },
      )
      .addCase('items/sse/connection/opened', (state, action) => {
        state.isConnected = true;
      })
      .addCase('items/sse/connection/closed', (state, action) => {
        state.isConnected = false;
      })
      .addCase(
        'items/sse/message/received',
        (state, action: PayloadAction<any, any>) => {
          state.byId[action.payload.name].state = action.payload.value;
        },
      );
  },
});

export default indicatorsSlice.reducer;
