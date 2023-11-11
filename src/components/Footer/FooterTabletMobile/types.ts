import { FooterProps } from "..";
import { AccordionProps } from "../../Accordion";

export interface FooterTabletMobileProps
  extends Pick<FooterProps, "columnData">,
    Pick<AccordionProps, "multiOpen"> {}
