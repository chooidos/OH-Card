import { configureStore } from '@reduxjs/toolkit';

import indicatorsSlice from './modules/oh-indicators-list/store/slice';

export const store = configureStore({
  reducer: {
    indicators: indicatorsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['sse'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
