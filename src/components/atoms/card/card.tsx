import React, {
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ForwardedRef,
} from 'react';
import styled from 'styled-components';
import { Draggable16 } from '@carbon/icons-react';

const CardRoot = styled.article`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 15%);
  background: #faffff;

  & .drag {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;

const Headline = styled.h2`
  font-size: 22px;
  font-weight: 700;
`;

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string;
  key: string;
  isInEditMode: boolean;
}

export const Card = forwardRef<
  ComponentPropsWithoutRef<'div'>,
  PropsWithChildren<Props>
>(({ style, className, isInEditMode, ...props }, ref: any) => (
  <CardRoot style={{ ...style }} className={className} ref={ref} {...props}>
    {isInEditMode && (
      <div
        style={{ position: 'absolute', top: 20, right: 10, opacity: 0.4 }}
        className="drag"
      >
        <Draggable16 />
      </div>
    )}
    <Headline>{props.title}</Headline>
    <div>{props.children}</div>
  </CardRoot>
));
