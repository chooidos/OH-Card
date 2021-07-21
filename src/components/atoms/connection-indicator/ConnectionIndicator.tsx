import styled from "styled-components";

interface IConnectionIndicator {
  isConnected: boolean
}

export const ConnectionIndicator = styled.div<IConnectionIndicator>`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: ${props => props.isConnected ? 'green': 'red'};
`;
