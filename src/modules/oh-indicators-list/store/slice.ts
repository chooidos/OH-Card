import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllItems } from '../network-layer';
import { IOpenhabItem } from '../types/openHab';

export interface IState {
  items: Record<string, IOpenhabItem>;
  error: string | null;
}

export const getAllItems = createAsyncThunk<IOpenhabItem[], void>(
  'items/fetchAllItems',
  fetchAllItems
);

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
      'sseMy', (state, action:PayloadAction<any,any>)=>{
        state.items[action.payload.name].state = action.payload.value;
      }
    );
  },
});

export default indicatorsSlice.reducer;
