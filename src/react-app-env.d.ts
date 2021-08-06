/// <reference types="react-scripts" />

declare module 'react-grid-layout' {
  import React, { ReactElement } from "react";

  interface LayoutItem {
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
    isDraggable?: boolean,
    isResizable?: boolean,
  }

  type ItemCallback = (layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
                       placeholder: LayoutItem, e: MouseEvent, element: HTMLElement) => void;

  interface GridLayoutProps {
    className?: string;
    width?: number;
    autoSize?: boolean;
    cols?: number;
    draggableCancel?: string;
    draggableHandle?: string;
    compactType?: 'vertical'|'horizontal';
    layout: LayoutItem[];
    margin?: [number, number];
    containerPadding?: [number, number];
    rowHeight?: number;
    droppingItem?: { i: string, w: number, h: number };
    isDraggable?: boolean;
    isResizable?: boolean;
    isBounded?: boolean;
    useCSSTransforms?: boolean;
    transformScale?: number;
    preventCollision?: boolean;
    isDroppable?: boolean;
    resizeHandles?: ('s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne')[],
    resizeHandle?: ReactElement;
    onLayoutChange?: (layout: any) => void,
    onDragStart?: ItemCallback,
    onDrag?: ItemCallback,
    onDragStop?: ItemCallback,
    onResizeStart?: ItemCallback,
    onResize?: ItemCallback,
    onResizeStop?: ItemCallback,
    onDrop?: (layout: Layout, item?: LayoutItem, e: Event) => void,
    onDropDragOver?: (e: DragOverEvent) => ({w?: number, h?: number} | false),
    innerRef?: React.Ref<"div">
  }

  interface Breakpoint {
    lg?: number,
    md?: number,
    sm?: number,
    xs?: number,
    xxs?: number,
  }

  interface ResponsiveGridLayoutAdditionalProps {
    breakpoints: Breakpoint,
    cols: Breakpoint,
    margin?: [number, number] | Record<Partial<keyof Breakpoint>, number>,
    containerPadding?: [number, number] | Record<Partial<keyof Breakpoint>, number>,
    layouts: Record<Partial<keyof Breakpoint>, LayoutItem[]>,
    onBreakpointChange?: (newBreakpoint: string, newCols: number) => void,
    onLayoutChange?: (currentLayout: Layout, allLayouts: { [key: keyof Breakpoint]: Layout }) => void,
    onWidthChange?: (containerWidth: number, margin: [number, number], cols: number, containerPadding: [number, number]) => void;
  }

  export type ResponsiveGridLayoutProps = Omit<GridLayoutProps, "layout" | "margin" | "containerPadding" | "cols">
    & ResponsiveGridLayoutAdditionalProps;
  export const Responsive: React.FC<ResponsiveGridLayoutProps>;

  const Grid: React.FC<GridLayoutProps>;
  export = Grid;
  export = LayoutItem;

  export const WidthProvider;
}