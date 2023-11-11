import { TextLinkProps } from "../components";
import { FooterProps } from "../types";

export interface TFooterContext
  extends Pick<FooterProps, "backgroundColorVariant">,
    Pick<TextLinkProps, "LinkWrapper"> {}
