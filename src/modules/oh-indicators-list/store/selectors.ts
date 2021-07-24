import { RootState } from '../../../store';

export const selectItems = (state: RootState) => state.indicators.items;
export const selectErrorMessage = (state: RootState) => state.indicators.error;
