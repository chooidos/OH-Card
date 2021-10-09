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
    { i: "1", x: 0, y: 0, w: 1, h: 4, static: false },
    { i: "2", x: 5, y: 0, w: 3, h: 4, static: false },
    { i: "3", x: 7, y: 0, w: 1, h: 4, static: false },
  ],
  md: [
    { i: "1", x: 0, y: 0, w: 1, h: 4, static: false },
    { i: "2", x: 3, y: 0, w: 5, h: 4, static: false },
    { i: "3", x: 8, y: 0, w: 1, h: 4, static: false },
  ],
  sm: [
    { i: "1", x: 0, y: 0, w: 1, h: 4, static: false },
    { i: "2", x: 1, y: 0, w: 3, h: 4, static: false },
    { i: "3", x: 4, y: 0, w: 1, h: 4, static: false },
  ],
  xs: [
    { i: "1", x: 0, y: 0, w: 2, h: 2, static: false },
    { i: "2", x: 1, y: 2, w: 2, h: 2, static: false },
    { i: "3", x: 4, y: 4, w: 2, h: 2, static: false },
  ],
  xxs: [
    { i: "1", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "2", x: 0, y: 1, w: 1, h: 1, static: false },
    { i: "3", x: 0, y: 2, w: 1, h: 1, static: false },
  ],
};

const cards = [
  { title: "a", key: "1" },
  { title: "b", key: "2" },
  { title: "c", key: "3" },
];

Primary.args = {
  layouts,
  cards,
  isDraggable: true,
  isRearrangeable: true,
  isResizable: true,
  rowHeight: 30,
  compactType: "vertical",
  draggableHandle: ".drag",
  children: cards.map((card: any) => (
    <Card key={card.key} title={card.title}>
      <span
        className='text drag'
        style={{ backgroundColor: "black", color: "white" }}
      >
        this is draggableHandle
      </span>
    </Card>
  )),
};
