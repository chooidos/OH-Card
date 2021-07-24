import React, { ReactNode } from 'react';
import LayoutItem, { Responsive, ResponsiveGridLayoutProps } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  children(l: any, index: number): ReactNode;
}

export const ResponsiveGrid = (props: ResponsiveGridLayoutProps & Props) => (
  <Responsive {...props}>
    {props.layouts.lg.map((l, i) => props.children ? props.children(l, i) : (
      <div key={l.i}>
        <span className="text">{i}</span>
      </div>
    ))}
  </Responsive>
);
