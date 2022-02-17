import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: (e: React.MouseEvent) => void;
  children: ReactElement;
}

const Button = styled.span`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  border-radius: 50%;
  color: #396464;
  border: 2px solid #396464;
  transition: all ease-in-out 0.25s;
  &:hover {
    cursor: pointer;
    color: #000000;
    border-color: #000000;
  }
`;

export const CircleButton = ({ onClick, children }: Props) => {
  return <Button onClick={onClick}>{children}</Button>;
};
