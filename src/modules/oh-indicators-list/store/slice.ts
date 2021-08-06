import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import {
  connectionClosed,
  connectionOpened,
  getAllItems,
  receiveMessage,
  startConnection,
} from './actions';

export interface IState {
  byId: Record<string, IOpenhabItem>;
  ids: string[];
  sseConnection: {
    connecting: boolean;
    state: boolean;
  };
  error: string | undefined;
}

export const indicatorsSlice = createSlice({
  name: 'indicatorsSlice',
  initialState: {
    byId: {},
    ids: [],
    sseConnection: {
      connecting: false,
      state: false,
    },
    error: undefined,
  } as IState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllItems.fulfilled,
        (state, action: PayloadAction<IOpenhabItem[]>) => {
          state.byId = action.payload.reduce(
            (items, item) => ({
              ...items,
              [item.name]: item,
            }),
            {},
          );
          state.ids = action.payload.map(({ name }) => name);
        },
      )
      .addCase(
        getAllItems.rejected,
        (state, action) => {
          state.error = action.error.message;
        },
      )
      .addCase(startConnection, (state) => {
        state.sseConnection.connecting = true;
      })
      .addCase(connectionOpened, (state) => {
        state.sseConnection.state = true;
        state.sseConnection.connecting = false;
      })
      .addCase(connectionClosed, (state) => {
        state.sseConnection.state = false;
        state.sseConnection.connecting = false;
      })
      .addCase(receiveMessage, (state, action: PayloadAction<{ name: string; value: string }>) => {
        state.byId[action.payload.name].state = action.payload.value;
      });
  },
});

export default indicatorsSlice.reducer;
