import { createSlice } from '@reduxjs/toolkit';
import { LayoutItem } from "react-grid-layout";

export interface UICard {
  layout: typeof LayoutItem;
  indicatorName: string;
  title: string;
}

export interface IUIState {
  isInEditMode: boolean;
  cards: UICard[];
}

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    isInEditMode: false,
    cards: [
      {
        id: '0',
        layout: { i: '0', x: 2, y: 0, w: 1, h: 1, static: false },
        indicatorName: 'room_kitchen_Pressure',
        title: 'some title'
      }
    ]
  },
  reducers: {
    updateLayoutById(state, action) {
      console.log(state, action);
    },
  },
});

export const { updateLayoutById } = uiSlice.actions;
export default uiSlice.reducer;
