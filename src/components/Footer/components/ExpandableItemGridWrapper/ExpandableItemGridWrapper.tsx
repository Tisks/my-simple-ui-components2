import React, { FC } from "react";
import { ExpandableItemGridWrapperProps, ItemGridProps } from "./types";
import { ExpandableItemGrid } from "../../../shared/layouts";

export const ExpandableItemGridWrapper: FC<ExpandableItemGridWrapperProps> = ({
  content_group,
  seeMoreButtonClickCallback,
  ...rest
}) => {
  return (
    <ExpandableItemGrid
      {...rest}
      seeMoreButtonClickCallback={(isExpanded: boolean) =>
        seeMoreButtonClickCallback?.(isExpanded, content_group)
      }
    />
  );
};

export const ItemGrid: FC<ItemGridProps> = ({ ...rest }) => {
  //Explicitly stating that this variation of the ExpandableItemGrid actually is not expandable because
  //it doesn't hide any items with the itemsOnSightLimit={undefined}
  return <ExpandableItemGrid {...rest} itemsOnSightLimit={undefined} />;
};
