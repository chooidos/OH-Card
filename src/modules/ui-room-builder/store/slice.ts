import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UICArd {
  layout: any;
  indicatorName: string;
  title: string;
}

export interface IUIState {
  isInEditMode: boolean;
  cards: UICArd[];
}

export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState: {
    isInEditMode: false,
    cards: [
      {
        layout: { i: '1', x: 2, y: 0, w: 1, h: 1, static: false },
        indicatorName: 'room_kitchen_Pressure',
        title: 'some title'
      }
    ]
  },
  reducers: {},
  // extraReducers: (builder) => {},
});

export default uiSlice.reducer;
