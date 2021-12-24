import { configureStore } from '@reduxjs/toolkit';

// TODO fix module exports
import indicatorsSlice, {
  IindicatorsState,
} from './modules/oh-indicators-list/store';
import { sseMiddleware } from './modules/oh-indicators-list/store/middlewares';
import { SseClient } from './modules/oh-indicators-list';
import uiSlice, { IUIState } from './modules/ui-room-builder/store';

export const store = configureStore({
  reducer: {
    indicators: indicatorsSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }).concat(sseMiddleware(new SseClient())),
});

export type RootState = { indicators: IindicatorsState, ui: IUIState};
export type AppDispatch = typeof store.dispatch;
