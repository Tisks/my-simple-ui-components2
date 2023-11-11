import React, { useState } from "react";
import styles from "./accordion.module.scss";
import { AccordionProps } from "./types";
import { AccordionItem } from "./components";
import classNames from "classnames";

// Define variant-specific props
const variants = {
  standard: {
    hasBorder: true,
    spacedItems: true,
  },
  compact: {
    hasBorder: false,
    titleOnlyHasBottomBorder: true,
  },
};

export const _setOpenIndexes = (
  prevIndexes: number[],
  index: number,
  multiOpen?: boolean
) => {
  const isItemOpen = prevIndexes.includes(index);

  if (isItemOpen) return prevIndexes.filter((i) => i !== index); //The same item is clicked when it is open => close it

  if (multiOpen) {
    return [...prevIndexes, index]; //New item was clicked => open it
  }

  return [index]; //Only one item can be open at the time if multiOpen is false
};

const Accordion: React.FC<AccordionProps> = ({
  items,
  multiOpen = true,
  variant = "standard",
  iconOrientation = "right",
  rotationAngle = 0,
  hasBorder = true,
  titleOnlyHasBottomBorder = false,
  ...rest
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const isItemOpen = (index: number) => openIndexes.includes(index);

  const toggleItem = (index: number) => {
    setOpenIndexes((prevIndexes) =>
      _setOpenIndexes(prevIndexes, index, multiOpen)
    );
  };

  // Merge variant-specific props with default props using the spread operator
  const { spacedItems, ...restProps } = { ...rest, ...variants[variant] };

  return (
    <div className={classNames(styles.accordion, restProps.className)}>
      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <AccordionItem
              item={item}
              index={index}
              variant={variant}
              toggleItem={toggleItem}
              isItemOpen={isItemOpen}
              iconOrientation={iconOrientation}
              rotationAngle={rotationAngle}
              titleOnlyHasBottomBorder={titleOnlyHasBottomBorder}
              {...restProps} // Pass the merged props to the AccordionItem
            />
            {index !== items.length - 1 && spacedItems && (
              <div
                className={classNames(
                  styles.accordion__spacer,
                  restProps.className
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Accordion;
