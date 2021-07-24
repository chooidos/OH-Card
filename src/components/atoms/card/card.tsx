import React, { forwardRef, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import styled from 'styled-components';

const CardRoot = styled.article`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 5%);
`;

const Headline = styled.h2`
  font-size: 22px;
  font-weight: 700;
`;

interface Props extends ComponentPropsWithoutRef<'div'> {
  title: string,
  key: string,
}

// https://stackoverflow.com/questions/54654303/using-a-forwardref-component-with-children-in-typescript
// still don't know what's going on with the types

export const Card = forwardRef<ComponentPropsWithoutRef<'div'>, PropsWithChildren<Props>>(
  ({ style, className, ...props}, ref) => (
    <CardRoot
      style={{ ...style}}
      className={className}
      ref={ref as any}
      key={props.key}
    >
        <Headline>
          {props.title}
        </Headline>
        <div>
          {props.children}
        </div>
    </CardRoot>
  ));
