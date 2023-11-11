import { ExpandableItemGridProps } from "../../..";
import { LinkListArgs } from "../LinkList";
import { TextLinkProps, TLinkWrapper, WithUseSubPathsOnly } from "../TextLink";

export interface TOnClickTrack {
  onClickGroup?: (isExpanded: boolean, content_group?: string) => void;
}

interface ColumnDataProps
  extends Pick<
      ExpandableItemGridProps,
      "itemsOnSightLimit" | "title" | "maxWidthGrid"
    >,
    Pick<LinkListArgs, "content_group" | "columnInfo">,
    Pick<TextLinkProps, "LinkWrapper">,
    WithUseSubPathsOnly {
  baseUrl?: string;
  itemGridColumns?: number | { tabletMobile: number; desktop: number };
}

export interface ColumnOnClickProps
  extends TOnClickTrack,
    Pick<TextLinkProps, "onClick"> {}

export interface ColumnProps extends ColumnDataProps, ColumnOnClickProps {}

export interface TabletMobileColumnProps extends ColumnProps {
  OverallLinkWrapper?: TLinkWrapper;
}

export type ColumnPropsArray = ColumnProps[];
