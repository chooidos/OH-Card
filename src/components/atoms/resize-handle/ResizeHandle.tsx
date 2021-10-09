import React, { forwardRef, ForwardedRef } from "react";
import { ChevronMini16 } from "@carbon/icons-react";
import styled from "styled-components";

const StyledHandleRoot = styled.div`
  position: absolute;
  bottom: 3px;
  right: 7px;
  cursor: nwse-resize;
  opacity: 0.4;
`;

const Handle = forwardRef(
  (props: { handleAxis?: string }, ref?: ForwardedRef<HTMLDivElement>) => {
    const { handleAxis, ...restProps } = props;
    return (
      <StyledHandleRoot
        ref={ref}
        className={`handle-${handleAxis}`}
        {...restProps}
      >
        <ChevronMini16 />
      </StyledHandleRoot>
    );
  }
);

Handle.displayName = "DraggableHandle";

export { Handle };
