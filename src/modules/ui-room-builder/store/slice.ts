import { createSlice } from '@reduxjs/toolkit';
import { LayoutItem } from 'react-grid-layout';
import { getUiStateFromStorage } from './actions';

export interface UICard {
  layout: typeof LayoutItem;
  indicatorName: string;
  title: string;
}

export interface IUIState {
  serverUrl: string;
  isInEditMode: boolean;
  cards: UICard[];
}

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    serverUrl: '',
    isInEditMode: false,
    cards: [
      {
        id: '0',
        layout: { i: '0', x: 1, y: 0, w: 2, h: 1, static: false },
        indicatorName: 'room_kitchen_Pressure',
        title: 'some title',
      },
    ],
  },
  reducers: {
    updateLayoutById(state, action) {
      state.cards[action.payload.id].layout = action.payload.layout
    },
    switchEditMode(state) {
      state.isInEditMode = !state.isInEditMode;
    },
    updateServerUrl(state, action) {
      state.serverUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUiStateFromStorage.fulfilled, (state, action) => {
      if (action.payload) {
        state.serverUrl = action.payload.serverUrl;
        state.cards = action.payload.cards;
      }
    });
  },
});

export const { updateLayoutById, switchEditMode, updateServerUrl } =
  uiSlice.actions;
export default uiSlice.reducer;
