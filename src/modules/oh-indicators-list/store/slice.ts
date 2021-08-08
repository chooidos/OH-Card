import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseStreamingResponse } from '../network-layer/sseClient';

import { ConnectionStates } from '../../../constants/network';
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
    state: ConnectionStates;
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
      state: ConnectionStates.Disconnected,
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
      .addCase(getAllItems.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(startConnection, (state) => {
        state.sseConnection.isConnecting = true;
        state.sseConnection.state = ConnectionStates.Transition;
      })
      .addCase(connectionOpened, (state) => {
        state.sseConnection.isConnected = true;
        state.sseConnection.isConnecting = false;
        state.sseConnection.state = ConnectionStates.Connected;
      })
      .addCase(connectionClosed, (state) => {
        state.sseConnection.isConnected = false;
        state.sseConnection.isConnecting = false;
        state.sseConnection.state = ConnectionStates.Disconnected;
      })
      // .addCase(receiveMessage, (state, action: PayloadAction<{ name: string; value: string }>) => {
      .addCase(receiveMessage, (state, action) => {
        const { name, value } = parseStreamingResponse(action.payload);
        state.byId[name].state = value;
      });
  },
});

export default indicatorsSlice.reducer;
