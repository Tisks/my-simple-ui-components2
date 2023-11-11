import { ColumnProps, TextLinkProps } from "../../..";

export interface LegalSectionProps extends Pick<TextLinkProps, "LinkWrapper"> {
  columnProps: ColumnProps;
}
