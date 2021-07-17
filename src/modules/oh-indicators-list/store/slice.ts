import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { getAllItems } from './actions';

export interface IState {
  items: Record<string, IOpenhabItem>;
  error: string | null;
}

export const indicatorsSlice = createSlice<IState, any>({
  name: 'persistentStateSlice',
  initialState: {
    items: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllItems.fulfilled,
      (state, action: PayloadAction<IOpenhabItem[]>) => {
        state.items = action.payload.reduce((items, item) => {
          return { ...items, [item.name as string]: item as IOpenhabItem };
        }, {});
      }
    );
    builder.addCase(
      getAllItems.rejected,
      (state, action: PayloadAction<any, any>) => {
        state.error = (action as any).error.message;
      }
    );
    builder.addCase(
      'items/sse/init', (state, action) => {
        // todo
      }
    );
    builder.addCase(
      'items/sse/message', (state, action: PayloadAction<any, any>) => {
        state.items[action.payload.name].state = action.payload.value;
      }
    );
  },
});

export default indicatorsSlice.reducer;
