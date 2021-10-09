import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ResponsiveGrid } from "./responsive-grid";
import { Card } from "../card/card";

export default {
  title: "Example/ResponsiveGrid",
  component: ResponsiveGrid,
  argTypes: {},
} as ComponentMeta<typeof ResponsiveGrid>;

const Template: ComponentStory<typeof ResponsiveGrid> = (args) => (
  <ResponsiveGrid {...args} />
);

export const Primary = Template.bind({});

const layouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4, static: false },
    { i: "b", x: 5, y: 0, w: 3, h: 4, static: false },
    { i: "c", x: 7, y: 0, w: 1, h: 4, static: false },
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 1, h: 4, static: false },
    { i: "b", x: 3, y: 0, w: 5, h: 4, static: false },
    { i: "c", x: 8, y: 0, w: 1, h: 4, static: false },
  ],
  sm: [
    { i: "a", x: 0, y: 0, w: 1, h: 4, static: false },
    { i: "b", x: 1, y: 0, w: 3, h: 4, static: false },
    { i: "c", x: 4, y: 0, w: 1, h: 4, static: false },
  ],
  xs: [
    { i: "a", x: 0, y: 0, w: 2, h: 2, static: false },
    { i: "b", x: 1, y: 2, w: 2, h: 2, static: false },
    { i: "c", x: 4, y: 4, w: 2, h: 2, static: false },
  ],
  xxs: [
    { i: "a", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "b", x: 0, y: 1, w: 1, h: 1, static: false },
    { i: "c", x: 0, y: 2, w: 1, h: 1, static: false },
  ],
};

Primary.args = {
  layouts,
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 30,
  compactType: "vertical",
  draggableHandle: ".drag",
  children: (l:any, i:any) => (
    <Card key={l.i} title={l.i}>
      <span className="text drag">{i}</span>
    </Card>
  ),
};
