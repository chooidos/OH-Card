import { createAsyncThunk } from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { fetchAllItems } from '../network-layer';
import { BASE_URL } from '../network-layer/constants';

export const getAllItems = createAsyncThunk<IOpenhabItem[], void>(
  'items/fetchAllItems',
  fetchAllItems
);

// todo: move to a separate place
const parseStreamingResponse = (incomingMessage: MessageEvent): { name: string, value: any } => {
  const data = JSON.parse(incomingMessage.data);
  const [,,name] = data.topic.split('/');
  const { value } = JSON.parse(data.payload);
  return { name, value };
};

export const initStreamingConnection = createAsyncThunk<void, void>(
  'items/sse/init',
  (_, { dispatch }) => {
    return new Promise((resolve, reject) => {
      const events = new EventSource(`${BASE_URL}/rest/events?topics=openhab/items/*/statechanged,openhab/items/*/*/statechanged`);
      events.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'ItemStateChangedEvent') {
          dispatch({
            type: 'items/sse/message',
            payload: parseStreamingResponse(event),
          });
        }
      };
      events.onopen = () => {
        resolve();
      };
      events.onerror = () => {
        events.close();
        reject();
      };
    });
  },
);
