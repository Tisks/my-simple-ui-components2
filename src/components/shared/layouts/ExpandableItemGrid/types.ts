import { DefaultSeeMoreButtonProps } from "./components/DefaultSeeMoreButton";

export interface ExpandableItemGridProps
  extends Pick<DefaultSeeMoreButtonProps, "showMoreText">,
    Pick<
      DefaultSeeMoreButtonProps,
      | "seeMoreButtonClickCallback"
      | "seeMoreButtonClickCallbackArgumentIsExpanded"
    > {
  title?: React.ReactNode;
  SeeMoreButton?: React.ReactNode;
  SeeMoreButtonProps?: Record<string, any>;
  childrenArray: React.ReactNodeArray;
  itemsOnSightLimit?: number;
  "data-testid"?: string;
  itemGridColumns?: number;
  maxWidthGrid?: number;
  doWrapChildrenOnListItem?: boolean;
  classNames?: {
    "expandable-item-grid"?: string;
    "expandable-item-grid__item"?: string;
    "expandable-item-grid__title"?: string;
    "expandable-item-grid__title__text"?: string;
  };
}
