import axios from 'axios';

import { IOpenhabItem } from '../types/openHab';
import { BASE_URL } from './constants';
import SseClient from './sseClient';

export const fetchAllItems = async () => {
  const response = await axios.get<IOpenhabItem[]>(`${BASE_URL}/rest/items`, {});
  return response.data;
};

export const sseitems = async (dispatch:any)=> {
  const events = new EventSource(`${BASE_URL}/rest/events?topics=openhab/items/*/statechanged,openhab/items/*/*/statechanged`);
  events.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'ItemStateChangedEvent') {
      const [,,name] = data.topic.split('/');
      const value = JSON.parse(data.payload).value;
      dispatch({
        type: 'sseMy',
        payload: {name,value}
      })
    }
  }
}

export const getItemStates = async (name: string, startTime?: string) => {
  const response = await axios.get(`${BASE_URL}/rest/persistence/items/${name}`, {params:{
    starttime: startTime,
  }});
  return response.data;
}

export const initSseConnection = (connection: string) => {
  return {
    type: 'sse',
    promise: (client: SseClient) =>
      client
        .connect(connection),
  };
};

export const closeSseConnection = () => {
  return {
    type: 'sse',
    promise: (client: SseClient) =>
      client
        .disconnect(),
  };
};

export const hookIntoEvent = (event: string, cb: any) => {
  return {
    type: 'sse',
    promise: (client: SseClient) =>
      client
        .on(event, cb),
  }
};
