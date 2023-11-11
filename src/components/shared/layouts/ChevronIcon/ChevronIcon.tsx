import React from "react";
import { ChevronIconDirections, ChevronIconProps } from "./types";
import styles from "./chevronIcon.module.scss";
import classNames from "classnames";

export const determineRotationAngle = (
  direction: ChevronIconDirections,
  rotationAngle?: number
) => (direction === "down" ? rotationAngle || 0 : (rotationAngle || 0) + 180);

const ChevronIcon: React.FC<ChevronIconProps> = ({
  direction,
  iconThickness = "1",
  rotationAngle = 0, // Default rotation angle is 0 degrees
  iconProps,
  iconPathProps,
  className,
  variant,
  ...rest
}) => {
  const iconClassName = classNames(
    styles.icon,
    { [styles["icon--compact"]]: variant === "compact" },
    className
  );
  const iconPathClassName = classNames(styles["icon__path"], className);

  return (
    <svg
      fill="none"
      data-testid={rest["data-testid"] || `${direction}-icon`}
      className={iconClassName}
      transform={`rotate(${determineRotationAngle(direction, rotationAngle)})`}
      xmlns="http://www.w3.org/2000/svg"
      {...{ viewBox: "0 0 16 17", ...iconProps }}
    >
      <path
        d="M15 4.5L7.84787 12.5L1 4.5"
        strokeWidth={iconThickness}
        className={iconPathClassName}
        {...iconPathProps}
      />
    </svg>
  );
};

export default ChevronIcon;
