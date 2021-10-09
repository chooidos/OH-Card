import React, { ReactNode } from "react";
import {
  Responsive,
  ResponsiveGridLayoutProps,
  WidthProvider,
} from "react-grid-layout";

import { Handle } from "../resize-handle/ResizeHandle";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";
import { Card } from "../card/card";

interface Props {
  children(l: any, index: number): ReactNode;
  cards: {
    title: string;
    key: string;
  }[];
}

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ResponsiveGrid = (props: any & Props) => {
  return (
    <ResponsiveGridLayout
      className="layout"
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      resizeHandle={(<Handle />) as any}
      {...props}
    >
      {props.children}
    </ResponsiveGridLayout>
  );
};
