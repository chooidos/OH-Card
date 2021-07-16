import { configureStore } from '@reduxjs/toolkit';

import persistantStateSlice from './modules/oh-indicators-list/store/slice';
import SseClient from './modules/oh-indicators-list/network-layer/sseClient';

const sseMiddleware = (client: any) => ({ dispatch, getState }: any) => (next: any) => (action: any) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { promise, type, ...rest } = action;

  if (action.type !== 'sse') {
    return next(action);
  }

  return promise(client)
    .then((result: any) => {
      return next({ ...rest, result, type: `${type}/fulfilled` });
    })
    .catch((error: any) => {
      return next({ ...rest, error, type: `${type}/failed` });
    });
};

export const store = configureStore({
  reducer: {
    indicators: persistantStateSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['sse'],
    },
  }).concat(sseMiddleware(new SseClient())),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
