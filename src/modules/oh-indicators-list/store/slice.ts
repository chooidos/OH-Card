import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ConnectionStates } from '../../../constants/network';
import { IOpenhabItem } from '../types/openHab';
import {
  sseConnectionClosed,
  sseConnectionOpened,
  getAllItems,
  receiveMessage,
  startSseConnection,
} from './actions';

export interface IState {
  byId: Record<string, IOpenhabItem>;
  ids: string[];
  sseConnection: {
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
      .addCase(startSseConnection, (state) => {
        state.sseConnection.state = ConnectionStates.Transition;
      })
      .addCase(sseConnectionOpened, (state) => {
        state.sseConnection.state = ConnectionStates.Connected;
      })
      .addCase(sseConnectionClosed, (state) => {
        state.sseConnection.state = ConnectionStates.Disconnected;
      })
      // .addCase(receiveMessage, (state, action: PayloadAction<{ name: string; value: string }>) => {
      .addCase(receiveMessage, (state, action) => {
        const { name, value } = action.payload;
        state.byId[name].state = value;
      });
  },
});

export default indicatorsSlice.reducer;
