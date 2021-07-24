import { createAsyncThunk } from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { fetchAllItems } from '../network-layer';

export const getAllItems = createAsyncThunk<IOpenhabItem[], void>(
  'items/fetchAllItems',
  fetchAllItems,
);

// TODO add typings

export const receiveMessage = <T>(payload: T) => ({
    type: 'items/sse/message/received',
    payload,
});

export const connectionOpened = () => ({
    type: 'items/sse/connection/opened'
});

export const connectionClosed = () => ({
    type: 'items/sse/connection/closed'
});
