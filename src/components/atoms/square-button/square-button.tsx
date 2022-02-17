import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: (e: React.MouseEvent) => void;
  children: ReactElement | string;
  type?: "button" | "submit" | "reset" | undefined ;
}

const Button = styled.button`
  font-size: 18px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  color: #396464;
  background-color: transparent;
  border: 2px solid #396464;
  transition: all ease-in-out 0.25s;
  &:hover {
    cursor: pointer;
    color: #000000;
    border-color: #000000;
  }
`;

export const SquareButton = ({ onClick, children, type}: Props) => {
  return <Button onClick={onClick} type={type}>{children}</Button>;
};
