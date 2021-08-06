import { configureStore } from '@reduxjs/toolkit';

// TODO fix module exports
import indicatorsSlice, {
  IState,
} from './modules/oh-indicators-list/store/slice';
import { sseMiddleware } from './modules/oh-indicators-list/store/middlewares';
import { SseClient } from './modules/oh-indicators-list';

export const store = configureStore({
  reducer: {
    indicators: indicatorsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }).concat(sseMiddleware(new SseClient())),
});

export type RootState = { indicators: IState };
export type AppDispatch = typeof store.dispatch;
