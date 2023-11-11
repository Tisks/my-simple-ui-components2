import { FooterProps } from "../../types";
import { ColumnProps } from "../Column";

export interface ColumnPropsSections {
  legalSection?: ColumnProps;
  socialMediaInfo?: ColumnProps;
}
export interface ContactDetailsProps
  extends Pick<FooterProps, "isTabletMobile"> {
  lowerSectionColumnData?: ColumnPropsSections;
  renderSimpleFooter?: boolean;
}
