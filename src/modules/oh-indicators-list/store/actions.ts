import {
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { fetchAllItems } from '../network-layer';

export const getAllItems = createAsyncThunk<
  IOpenhabItem[],
  void,
  {
    rejectValue: {
      error: {
        message: string;
      }
    }
  }>(
  'items/fetchAllItems',
  fetchAllItems,

);

const SSE_ACTION = 'items/sse';

enum SSE_ACTION_CONNECTION {
  Init = 'connection/init',
  Start = 'connection/start',
  Opened = 'connection/opened',
  Close = 'connection/close',
  Closed = 'connection/closed',
}

export const receiveMessage = createAction(
  `${SSE_ACTION}/message/received`,
  (input: MessageEvent) => ({
    payload: input,
  }),
);

export const initConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Init}`);
export const startConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Start}`);
export const closeConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Close}`);
export const connectionOpened = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Opened}`);
export const connectionClosed = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Closed}`);
