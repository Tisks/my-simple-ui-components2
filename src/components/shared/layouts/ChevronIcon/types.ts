import { SVGAttributes, SVGProps } from "react";
import { AccordionVariants } from "../../../Accordion/types";

export type ChevronIconDirections = "up" | "down";
export interface ChevronIconProps {
  direction: ChevronIconDirections;
  rotationAngle?: number; // Rotation angle in degrees
  iconThickness?: string;
  iconProps?: SVGAttributes<SVGElement>;
  iconPathProps?: SVGProps<SVGPathElement>;
  className?: string;
  "data-testid"?: string;
  variant?: AccordionVariants;
}
