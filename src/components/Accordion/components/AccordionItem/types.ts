import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { AccordionVariants } from "../../types";
import { ChevronIconProps } from "../../../shared";

export type AccordionItemOnClickParams = {
  isExpanded: boolean;
  index: number;
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

export type AccordionItemOnClick = ({
  isExpanded,
  index,
  e,
}: AccordionItemOnClickParams) => void;

// Each items has its own button props for the title because the content is managed by
// the dev that passes the component
export interface SingleAccordionItem
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "title" | "content"
  > {
  title: ReactNode;
  content: ReactNode;
  onClick?: AccordionItemOnClick;
  "data-testid"?: string;
}

export interface AccordionItemProps
  extends Pick<
    ChevronIconProps,
    "rotationAngle" | "iconProps" | "iconPathProps" | "iconThickness"
  > {
  item: SingleAccordionItem;
  index: number;
  toggleItem: (index: number) => void;
  isItemOpen: (index: number) => boolean;
  iconOrientation?: "left" | "right";
  hasBorder?: boolean;
  titleOnlyHasBottomBorder?: boolean;
  className?: string;
  "data-testid"?: string;
  variant?: AccordionVariants;
}
