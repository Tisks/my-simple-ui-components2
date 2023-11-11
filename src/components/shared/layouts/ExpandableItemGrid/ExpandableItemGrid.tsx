import React, {
  useState,
  useMemo,
  useRef,
  isValidElement,
  cloneElement,
} from "react";
import styles from "./expandableItemGrid.module.scss";
import classnames from "classnames";
import { ExpandableItemGridProps } from "./types";
import DefaultSeeMoreButton from "./components/DefaultSeeMoreButton/DefaultSeeMoreButton";
import { getDataTestId } from "./helpers";

const ExpandableItemGrid: React.FC<ExpandableItemGridProps> = ({
  title,
  SeeMoreButton,
  SeeMoreButtonProps,
  childrenArray,
  itemsOnSightLimit,
  showMoreText,
  seeMoreButtonClickCallback,
  seeMoreButtonClickCallbackArgumentIsExpanded,
  itemGridColumns,
  maxWidthGrid,
  doWrapChildrenOnListItem = false,
  classNames,
  ...rest
}) => {
  const innerRef = useRef<HTMLUListElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleChildren = useMemo(() => {
    return isExpanded
      ? childrenArray
      : childrenArray.slice(0, itemsOnSightLimit);
  }, [isExpanded, childrenArray, itemsOnSightLimit]);

  if (itemsOnSightLimit !== undefined && itemsOnSightLimit < 0) return null;

  const itemUnorderedListClasses = classnames(
    styles["expandable-item-grid"],
    classNames?.["expandable-item-grid"]
  );
  const titleContainerClasses = classnames(
    styles["expandable-item-grid__title"],
    classNames?.["expandable-item-grid__title"]
  );

  const listItemClasses = classnames(
    styles["expandable-item-grid__item"],
    classNames?.["expandable-item-grid__item"]
  );

  const titleTextClasses = classnames(
    styles["expandable-item-grid__title__text"],
    classNames?.["expandable-item-grid__title__text"]
  );

  const maxWidth = {
    "--width": maxWidthGrid
      ? `${maxWidthGrid}px`
      : innerRef.current
      ? `${
          innerRef.current.clientWidth
            ? `${innerRef.current.clientWidth}px` //offset to be safe
            : ""
        }`
      : "",
  };

  const gridColumns = {
    "--grid-columns": itemGridColumns
      ? `repeat(${itemGridColumns}, 1fr)`
      : "1fr",
  };

  return (
    <ul
      ref={innerRef}
      className={itemUnorderedListClasses}
      data-testid={getDataTestId(rest["data-testid"])}
      //@ts-ignore
      style={{
        ...maxWidth,
        ...gridColumns, // Apply the custom style
      }}
    >
      {!!title && (
        <li className={titleContainerClasses}>
          {typeof title !== "string" ? (
            title
          ) : (
            <h4 className={titleTextClasses}>{title}</h4>
          )}
        </li>
      )}

      {visibleChildren.map((child, index) => {
        return (
          <React.Fragment key={index}>
            {doWrapChildrenOnListItem ? (
              <li className={listItemClasses}>{child}</li>
            ) : (
              child
            )}
          </React.Fragment>
        );
      })}

      {!!itemsOnSightLimit && childrenArray.length > itemsOnSightLimit && (
        <li className={listItemClasses}>
          {isValidElement(SeeMoreButton) ? (
            cloneElement(SeeMoreButton, {
              ...SeeMoreButtonProps,
              //@ts-ignore
              isExpanded,
              setIsExpanded,
            })
          ) : (
            <DefaultSeeMoreButton
              showMoreText={showMoreText}
              setIsExpanded={setIsExpanded}
              seeMoreButtonClickCallback={seeMoreButtonClickCallback}
              seeMoreButtonClickCallbackArgumentIsExpanded={
                seeMoreButtonClickCallbackArgumentIsExpanded
              }
            />
          )}
        </li>
      )}
    </ul>
  );
};

export default ExpandableItemGrid;
