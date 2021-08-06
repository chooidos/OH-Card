import React, { ReactNode, useState } from "react";
import LayoutItem, {
  Responsive,
  ResponsiveGridLayoutProps,
  WidthProvider,
} from "react-grid-layout";

import { Handle } from "../resize-handle/ResizeHandle";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";

interface Props {
  children(l: any, index: number): ReactNode;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ResponsiveGrid = (props: ResponsiveGridLayoutProps & Props) => {
  return null;
};
