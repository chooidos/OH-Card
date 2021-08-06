import {
  createAsyncThunk,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { fetchAllItems } from '../network-layer';
import { parseStreamingResponse } from '../network-layer/sseClient';

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

interface IMessageToConsumable {
  (message: MessageEvent): Omit<
    PayloadAction<ReturnType<typeof parseStreamingResponse>>,
    'type'
  >;
}

export const receiveMessage = createAction<IMessageToConsumable>(
  `${SSE_ACTION}/message/received`,
  (input: MessageEvent) => ({
    payload: parseStreamingResponse(input),
  }),
);

export const initConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Init}`);
export const startConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Start}`);
export const closeConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Close}`);
export const connectionOpened = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Opened}`);
export const connectionClosed = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Closed}`);
