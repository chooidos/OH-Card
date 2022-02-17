import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Group } from "react-dropdown";
import { LayoutItem } from "react-grid-layout";

import { selectors } from "../oh-indicators-list/store";
import { selectors as uiSelectors } from "./store";
import { updateLayoutById } from "./store/slice";

import { ResponsiveCards } from "../../components/molecules/cards/responsive-cards";
import { Card } from "../../components/atoms/card/card";
import { Dropdown } from "../../components/atoms/dropdown/dropdown";

export const RoomBuilder = () => {
  const dispatch = useDispatch();
  const groupedIndicators = useSelector(selectors.selectItemsByGroups);
  const cards = useSelector(uiSelectors.selectCards);
  const editMode = useSelector(uiSelectors.selectEditMode)

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

  const onLayoutChange = (layout: typeof LayoutItem[]) => {
    layout.forEach((item) => {
      dispatch(updateLayoutById({ id: item.i, layout: item }));
    });
  };

  return (
    <ResponsiveCards
      onLayoutChange={onLayoutChange}
      cards={cards}
      isInEditMode={editMode}
      renderCard={(item) => (
        <Card key={item.layout.i} title={item.title} isInEditMode={editMode}>
          <Dropdown options={options} />
        </Card>
      )}
    />
  );
};
