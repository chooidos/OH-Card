import { Middleware } from 'redux';

import { RootState } from '../../../store';

export const localStorageMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    const storedUiState = {
      serverUrl: store.getState().ui.serverUrl,
      cards: store.getState().ui.cards,
    }
    if (action.type === 'ui/state/save') {
      localStorage.setItem('uiState',JSON.stringify(storedUiState))
    }

    return next(action);
  };
