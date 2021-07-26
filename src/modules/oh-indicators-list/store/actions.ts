import {
  createAsyncThunk,
  createAction,
  PayloadAction,
} from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { fetchAllItems } from '../network-layer';

export const getAllItems = createAsyncThunk<IOpenhabItem[], void>(
  'items/fetchAllItems',
  fetchAllItems,
);

// TODO add typings
// todo: move to a separate place
const parseStreamingResponse = (
  incomingMessage: MessageEvent,
): { name: string; value: any } => {
  const data = JSON.parse(incomingMessage.data);
  const [, , name] = data.topic.split('/');
  const { value } = JSON.parse(data.payload);
  return { name, value };
};

const SSE_ACTION = 'items/sse';

enum SSE_ACTION_CONNECTION {
  Init = 'connection/init',
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
export const closeConnection = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Close}`);
export const connectionOpened = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Opened}`);
export const connectionClosed = createAction<void>(`${SSE_ACTION}/${SSE_ACTION_CONNECTION.Closed}`);
