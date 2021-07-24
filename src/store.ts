import { configureStore } from '@reduxjs/toolkit';

// TODO fix module exports
import indicatorsSlice from './modules/oh-indicators-list/store/slice';
import { sseMiddleware } from './modules/oh-indicators-list/store/middlewares';
import { Client } from './modules/oh-indicators-list';

export const store = configureStore({
  reducer: {
    indicators: indicatorsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [],
    },
  }).concat(sseMiddleware(new Client())),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
