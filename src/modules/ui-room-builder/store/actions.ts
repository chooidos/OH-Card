import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

enum UI_ACTIONS {
  SaveState = 'ui/state/save',
  GetState = 'ui/state/get',
}

export const getUiStateFromStorage = createAsyncThunk(
  UI_ACTIONS.GetState,
  async () => {
    const storedUiState = localStorage.getItem('uiState');
    if (storedUiState) {
      return JSON.parse(storedUiState);
    }
  },
);

export const saveUiStateToStorage = createAction<void>(
  `${UI_ACTIONS.SaveState}`,
);
