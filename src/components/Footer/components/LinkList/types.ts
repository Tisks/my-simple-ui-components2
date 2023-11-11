import { TextLinkProps, TextLinks } from "../TextLink";

export interface LinkListArgs
  extends Pick<TextLinkProps, "onClick" | "content_group" | "LinkWrapper"> {
  columnInfo: TextLinks;
  classNames?: {
    "link-list__list__item"?: string;
    "link-list__list__item__text"?: string;
    "link-list__list__item__link"?: string;
  };
}
