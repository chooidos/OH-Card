import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseStreamingResponse } from '../network-layer/sseClient';

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
    isConnecting: boolean;
    isConnected: boolean;
  };
  error: string | undefined;
}

export const indicatorsSlice = createSlice({
  name: 'indicatorsSlice',
  initialState: {
    byId: {},
    ids: [],
    sseConnection: {
      isConnecting: false,
      isConnected: false,
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
        state.sseConnection.isConnecting = true;
      })
      .addCase(connectionOpened, (state) => {
        state.sseConnection.isConnected = true;
        state.sseConnection.isConnecting = false;
      })
      .addCase(connectionClosed, (state) => {
        state.sseConnection.isConnected = false;
        state.sseConnection.isConnecting = false;
      })
      // .addCase(receiveMessage, (state, action: PayloadAction<{ name: string; value: string }>) => {
      .addCase(receiveMessage, (state, action) => {
        const {name,value} = parseStreamingResponse(action.payload);
        state.byId[name].state = value;
      });
  },
});

export default indicatorsSlice.reducer;
