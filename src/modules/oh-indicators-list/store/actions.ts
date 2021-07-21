import { createAsyncThunk } from '@reduxjs/toolkit';

import { IOpenhabItem } from '../types/openHab';
import { fetchAllItems } from '../network-layer';
import { BASE_URL } from '../network-layer/constants';

export const getAllItems = createAsyncThunk<IOpenhabItem[], void>(
  'items/fetchAllItems',
  fetchAllItems
);
