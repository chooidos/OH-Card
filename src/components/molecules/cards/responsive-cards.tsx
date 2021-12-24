import React from "react";

import { ResponsiveGrid } from "../../atoms/responsive-grid/responsive-grid";
import { Card } from "../../atoms/card/card";
import { Dropdown } from "../../atoms/dropdown/dropdown";
import { useSelector } from "react-redux";
import { selectors } from "../../../modules/oh-indicators-list/store";
import { selectors as uiSelectors} from "../../../modules/ui-room-builder/store";
import { Group } from "react-dropdown";

export const ResponsiveCards = () => {
  const groupedIndicators = useSelector(selectors.selectItemsByGroups);
  const cards = useSelector(uiSelectors.selectCards);
  const layouts = {
    lg: cards.map((card) => card.layout)
  };
  const options: Group[] =[];

  for (const type in groupedIndicators) {

    const group = {
      type: 'group',
      name: type,
      items: groupedIndicators[type].map((indicator)=>{
        return {
          value: indicator.name,
          label: indicator.name,
        }
      }),
    } as Group

    options.push(group);
  }

  return (
    <ResponsiveGrid
      layouts={layouts}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    >
      {cards.map((item, index) => (
        <Card key={item.layout.i} title={item.title}>
          <span className="text">{index}</span>
          <Dropdown options={options} />
        </Card>
      ))}
    </ResponsiveGrid>
  );
};
