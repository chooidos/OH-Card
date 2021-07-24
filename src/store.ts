import { configureStore } from '@reduxjs/toolkit';
import persistantStateSlice from './modules/oh-indicators-list/store/slice';

export const store = configureStore({
  reducer: {
    indicators: persistantStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
