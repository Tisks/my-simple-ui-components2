import React from "react";
import styles from "./accordionItem.module.scss";
import { AccordionItemProps } from "./types";
import classNames from "classnames";
import { ChevronIcon } from "../../../shared";

export const getContentContainerId = (
  index: number,
  dataTestId?: string | number
) => `${`${dataTestId || index}-`}content-container_id`;

export const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  index,
  className,
  iconOrientation,
  rotationAngle,
  hasBorder,
  titleOnlyHasBottomBorder,
  iconProps,
  iconPathProps,
  toggleItem,
  isItemOpen,
  iconThickness,
  variant,
}) => {
  const isActive = isItemOpen(index);
  const { title, content, onClick, "data-testid": dataTestId, ...rest } = item;

  const itemClasses = classNames(
    styles.item,
    {
      [styles["item--bordered"]]: hasBorder,
    },
    className
  );

  const titleClasses = classNames(
    styles.title,
    {
      [styles["title--right-icon"]]: iconOrientation === "right",
      [styles["title--has-only-bottom-border"]]:
        titleOnlyHasBottomBorder && !isActive && !hasBorder,
      [styles["title--has-only-bottom-border-non-active"]]:
        hasBorder && !isActive,
    },
    styles[`title--${variant}`],
    className
  );
  const contentClasses = classNames(
    styles.content,
    {
      [styles.active]: isActive,
      [styles["content--simple-format"]]: typeof content === "string" && variant === 'standard',
    },
    className
  );

  const titleTextClasses = classNames(
    styles["title__text"],
    {
      [styles["title__text--left-icon"]]: iconOrientation === "left",
    },
    className
  );

  const defaultContentTextClasses = classNames(
    [styles[`content--${variant}`]],
    className
  );

  return (
    <div className={itemClasses} data-testid={dataTestId}>
      <h2 style={{ margin: 0 }}>
        <button
          role="button"
          className={titleClasses}
          onClick={(e) => {
            toggleItem(index);
            onClick?.({ isExpanded: !isItemOpen(index), index, e });
          }}
          data-testid={`item-icon-${iconOrientation}-orientation`}
          {...rest}
        >
          {iconOrientation === "left" && (
            <ChevronIcon
              rotationAngle={rotationAngle}
              direction={isActive ? "up" : "down"}
              iconProps={iconProps}
              iconPathProps={iconPathProps}
              iconThickness={iconThickness}
              variant={variant}
            />
          )}
          <p className={titleTextClasses}>{title}</p>
          {iconOrientation === "right" && (
            <ChevronIcon
              rotationAngle={rotationAngle}
              direction={isActive ? "up" : "down"}
              iconProps={iconProps}
              iconPathProps={iconPathProps}
              iconThickness={iconThickness}
              variant={variant}
            />
          )}
        </button>
      </h2>
      <div
        className={contentClasses}
        data-testid={getContentContainerId(index, dataTestId)}
      >
        {typeof content === "string" ? (
          <p className={defaultContentTextClasses}>{content}</p>
        ) : //Add the default style based on the variant without overwriting its props
        React.isValidElement(content) ? (
          React.cloneElement(content, {
            className: `${defaultContentTextClasses} ${
              content.props.className || ""
            }`,
          } as React.HTMLAttributes<HTMLElement>)
        ) : null}
      </div>
    </div>
  );
};
