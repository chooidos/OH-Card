import React, {
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ForwardedRef,
} from "react";
import styled from "styled-components";
// import Z from Y;

const CardRoot = styled.article`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 15%);
  background: #faffff;
`;

const Headline = styled.h2`
  font-size: 22px;
  font-weight: 700;
`;

interface Props extends ComponentPropsWithoutRef<"div"> {
  title: string;
  key: string;
}

export const Card = forwardRef<
  ComponentPropsWithoutRef<"div">,
  PropsWithChildren<Props>
>(({ style, className, ...props }, ref: any) => (
  <CardRoot
    style={{ ...style }}
    className={className}
    ref={ref}
    {...props}
  >
    <Headline>{props.title}</Headline>
    <div>{props.children}</div>
  </CardRoot>
));
