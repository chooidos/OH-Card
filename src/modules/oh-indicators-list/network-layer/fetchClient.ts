import axios from 'axios';

import { IOpenhabItem } from '../types/openHab';
import { BASE_URL } from './constants';

export const fetchAllItems = async (serverUrl: string) => {
  const response = await axios.get<IOpenhabItem[]>(
    `${serverUrl}/rest/items`,
    {},
  );
  return response.data;
};

export const getItemStates = async (name: string, startTime?: string) => {
  const response = await axios.get(
    `${BASE_URL}/rest/persistence/items/${name}`,
    {
      params: {
        starttime: startTime,
      },
    },
  );
  return response.data;
};
