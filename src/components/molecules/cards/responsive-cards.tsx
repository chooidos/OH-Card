import React from "react";

import { ResponsiveGrid } from "../../atoms/responsive-grid/responsive-grid";
import { Card } from "../../atoms/card/card";

export const ResponsiveCards = () => {
  const layouts = {
    lg: [
      { i: '1', x: 0, y: 0, w: 1, h: 1, static: false },
    ],
  };

  const cards = [
    { title: 'a', key: '1' },
  ];

  return (
    <ResponsiveGrid
      layouts={layouts}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {cards.map((item, index) => (
        <Card key={item.key} title={item.title}>
          <span className="text">{index}</span>
        </Card>
      ))}
    </ResponsiveGrid>
  );
};
