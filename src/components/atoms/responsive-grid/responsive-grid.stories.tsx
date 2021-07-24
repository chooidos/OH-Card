import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ResponsiveGrid } from './responsive-grid';
import { Card } from '../card/card';

export default {
  title: 'Example/ResponsiveGrid',
  component: ResponsiveGrid,
  argTypes: {},
} as ComponentMeta<typeof ResponsiveGrid>;

const Template: ComponentStory<typeof ResponsiveGrid> = (args) => <ResponsiveGrid {...args} />;

export const Primary = Template.bind({});

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 4, static: false },
  { i: 'b', x: 1, y: 0, w: 3, h: 4, static: false },
  { i: 'c', x: 4, y: 0, w: 1, h: 4, static: false },
];
const layouts = {
  lg: layout,
  md: layout,
  sm: layout,
  xs: layout,
  xxs: layout,
};

Primary.args = {
  layouts,
  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
  cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
  rowHeight: 30,
  width: 1200,
  compactType: 'horizontal',
  children: (l, i) => (
    <Card key={l.i} title={l.i}>
     <span className="text">{i}</span>
   </Card>
  ),
};
