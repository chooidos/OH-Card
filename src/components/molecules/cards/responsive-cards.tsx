import React, {ReactElement, useMemo} from "react";
import { LayoutItem } from "react-grid-layout";

import { ResponsiveGrid } from "../../atoms/responsive-grid/responsive-grid";

import { UICard } from "../../../modules/ui-room-builder/store/slice";

interface Props {
  cards: UICard[];
  onLayoutChange: (x: typeof LayoutItem[]) => void;
  renderCard: (item: UICard, index: number) => ReactElement,
}

export const ResponsiveCards = ({ cards, onLayoutChange, renderCard }: Props) => {
  const layouts = useMemo(() => ({
    lg: cards.map((card) => card.layout)
  }), [cards]);

  return (
    <ResponsiveGrid
      layouts={layouts}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      onLayoutChange={onLayoutChange}
    >
      {cards.map(renderCard)}
    </ResponsiveGrid>
  );
};
