import styled from "styled-components";

interface IConnectionIndicator {
  isConnected: boolean
}

export const ConnectionIndicator = styled.div<IConnectionIndicator>`
  height: 12px;
  width: 12px;
  border-radius: 100%;
  background-color: ${props => props.isConnected ? 'rgb(98,198,22)': 'red'};
`;
