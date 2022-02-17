import { RootState } from '../../../store';

export const selectCards = (state: RootState) => state.ui.cards;
export const selectEditMode = (state: RootState) => state.ui.isInEditMode;
export const selectServerUrl = (state: RootState) => state.ui.serverUrl;
