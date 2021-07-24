import { RootState } from '../../../store';

export const selectItems = (state: RootState) => state.indicators.byId;
export const selectErrorMessage = (state: RootState) => state.indicators.error;
export const selectIsConnected = (state: RootState) =>
  state.indicators.isConnected;
