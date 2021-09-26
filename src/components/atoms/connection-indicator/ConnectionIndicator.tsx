import styled from 'styled-components';

import { ConnectionStates } from '../../../constants/network';

interface IConnectionIndicator {
  connectionState: ConnectionStates;
}

const stateColors: Record<ConnectionStates, string> = {
  [ConnectionStates.Disconnected]: 'rgb(192,63,63)',
  [ConnectionStates.Transition]: 'rgb(239,200,86)',
  [ConnectionStates.Connected]: 'rgb(98,198,22)',
};

export const ConnectionIndicator = styled.div<IConnectionIndicator>`
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 100%;
  background-color: ${({ connectionState }) => stateColors[connectionState]};
  margin-right: 20px;
`;
