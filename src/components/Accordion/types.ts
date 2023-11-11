import { ChevronIconProps } from "../shared";
import {
  AccordionItemProps,
  SingleAccordionItem,
} from "./components/AccordionItem/types";

export type AccordionVariants = "standard" | "compact";
export interface AccordionProps
  extends Pick<
      AccordionItemProps,
      | "iconOrientation"
      | "hasBorder"
      | "titleOnlyHasBottomBorder"
      | "iconThickness"
    >,
    Pick<ChevronIconProps, "rotationAngle" | "iconProps" | "iconPathProps"> {
  items: SingleAccordionItem[];
  multiOpen?: boolean;
  spacedItems?: boolean;
  variant?: AccordionVariants;
  className?: string;
}
