import React, { forwardRef, ForwardedRef } from "react";
import { ChevronMini16, NotificationNew32 } from "@carbon/icons-react";
import styled from "styled-components";

const StyledHandleRoot = styled.div`
  position: absolute;
  bottom: 3px;
  right: 7px;
  cursor: nwse-resize;
  opacity: 0.4;
`;

const Handle = forwardRef(
  (props: { handleAxis?: string, editMode?:boolean }, ref?: ForwardedRef<HTMLDivElement>) => {
    const { handleAxis, editMode, ...restProps } = props;
    return (
      <StyledHandleRoot
      style={{display: editMode ? "inline": "none"}}
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
