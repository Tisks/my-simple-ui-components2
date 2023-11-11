import {
  ColumnOnClickProps,
  ColumnProps,
  ColumnPropsArray,
  ContactDetailsProps,
  TextLinkProps,
} from ".";
import { AccordionProps } from "..";
import { TextLink } from "./components/TextLink/types";

export type TBackgroundColorVariant = "standard" | "light";

export interface FooterProps
  extends Pick<ContactDetailsProps, "lowerSectionColumnData">,
    Pick<AccordionProps, "multiOpen">,
    Pick<TextLinkProps, "LinkWrapper"> {
  renderSimpleFooter?: boolean;
  doRender?: boolean;
  isTabletMobile?: boolean;
  columnData?: ColumnPropsArray;
  clickHandlers?: ColumnOnClickProps;
  usedColumnPropsByLinkColumnId?: Record<string, Partial<ColumnProps>>; //Keys are content_groups (identifier for each link column)
  usedColumnInfoPropsByLinkColumnId?: Record<string, Partial<TextLink>>; //Keys are content_groups (identifier for each link column)
  backgroundColorVariant?: TBackgroundColorVariant;
}
