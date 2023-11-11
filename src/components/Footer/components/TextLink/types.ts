import { GenericWrapperProps } from "../../../shared";

export type TextLinkContent = {
  href?: string;
  text?: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export type TextLink = {
  doInjectPrefixBaseUrl?: boolean;
} & TextLinkContent;

export type TextLinks = TextLink[];

export type TOnClickTextLinkInfo = (
  text: string,
  href: string,
  content_group?: string
) => void;

export interface TextLinkProps {
  href?: string;
  text?: string;
  target?: React.HTMLAttributeAnchorTarget;
  content_group?: string;
  onClick?: TOnClickTextLinkInfo;
  classNames?: {
    "text-link__text"?: string;
    "text-link__link"?: string;
  };
  LinkWrapper?: TLinkWrapper;
}

export type TLinkWrapper = GenericWrapperProps<any> &
  WithUseSubPathsOnly &
  WithDoOnClickOnLink;

export interface WithUseSubPathsOnly {
  enableSubPathsOnly?: boolean;
}
export interface WithDoOnClickOnLink {
  doOnClickOnLink?: TDoOnClickOnClick;
}

export type TDoOnClickOnClick = (
  link: TextLinkContent,
  enableSubPathsOnly?: boolean,
  additionalProps?: any
) => boolean;
