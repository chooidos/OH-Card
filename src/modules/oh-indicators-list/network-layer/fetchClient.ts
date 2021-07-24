import axios from 'axios';

import { IOpenhabItem } from '../types/openHab';
import { BASE_URL } from './constants';

export const fetchAllItems = async () => {
  const response = await axios.get<IOpenhabItem[]>(`${BASE_URL}/rest/items`, {});
  return response.data;
};
