import React, { FC } from "react";
import { ColumnProps, TabletMobileColumnProps } from "./types";
import { AccordionItemOnClickParams } from "../../..";
import style from "./column.module.scss";
import {
  ExpandableItemGridWrapper,
  ItemGrid,
} from "../ExpandableItemGridWrapper";
import { LinkList } from "../LinkList";
import { addPrefixUrl } from "../TextLink/utils";
import {
  determineUsedLinkWrapperProps,
  useGetUsedLinkWrapper,
} from "../../hooks/useGetUsedLinkWrapper";

export const getCorrespondingPropOnDeviceType = (
  isTabletMobile: boolean,
  propDependingOnDeviceType?:
    | number
    | {
        tabletMobile: number;
        desktop: number;
      }
): number | undefined => {
  if (!propDependingOnDeviceType) return undefined;

  if (typeof propDependingOnDeviceType === "number")
    return propDependingOnDeviceType;

  if (isTabletMobile) return propDependingOnDeviceType.tabletMobile;

  return propDependingOnDeviceType.desktop;
};

export const ColumnAccordionItem = ({
  columnInfo,
  content_group,
  title,
  itemGridColumns,
  baseUrl,
  onClick,
  onClickGroup,
  LinkWrapper,
  OverallLinkWrapper,
  enableSubPathsOnly,
}: TabletMobileColumnProps) => {
  const { usedLinkWrapper, enableSubPathsOnly: usedEnableSubPathsOnly } =
    determineUsedLinkWrapperProps(
      enableSubPathsOnly,
      OverallLinkWrapper || LinkWrapper
    );
  const List = LinkList({
    columnInfo: addPrefixUrl(columnInfo, usedEnableSubPathsOnly, baseUrl),
    content_group,
    onClick,
    LinkWrapper: usedLinkWrapper, //Prefer the passed to the footer over the individual one
  });

  return {
    title: (
      <>
        {typeof title !== "string" ? (
          title
        ) : (
          <h2 className={style["column__title"]}>{title}</h2>
        )}
      </>
    ),
    content: (
      <ItemGrid
        childrenArray={List}
        itemGridColumns={getCorrespondingPropOnDeviceType(
          true,
          itemGridColumns
        )}
      />
    ),
    "data-testid": content_group,
    onClick: ({ isExpanded }: AccordionItemOnClickParams) =>
      onClickGroup?.(isExpanded, content_group),
  };
};

export const ColumnDesktop: FC<ColumnProps> = ({
  columnInfo,
  content_group,
  itemsOnSightLimit,
  itemGridColumns,
  maxWidthGrid,
  baseUrl,
  title,
  onClick,
  onClickGroup,
  LinkWrapper,
  enableSubPathsOnly,
}) => {
  const { usedLinkWrapper, enableSubPathsOnly: usedEnableSubPathOnly } =
    useGetUsedLinkWrapper(enableSubPathsOnly, LinkWrapper);

  const List = LinkList({
    columnInfo: addPrefixUrl(columnInfo, usedEnableSubPathOnly, baseUrl),
    content_group,
    onClick,
    LinkWrapper: usedLinkWrapper,
  });

  return (
    <ExpandableItemGridWrapper
      childrenArray={List}
      maxWidthGrid={maxWidthGrid}
      content_group={content_group}
      itemGridColumns={getCorrespondingPropOnDeviceType(false, itemGridColumns)}
      itemsOnSightLimit={itemsOnSightLimit}
      title={
        <>
          {typeof title !== "string" ? (
            title
          ) : (
            <h2 className={style["column__title"]}>{title}</h2>
          )}
        </>
      }
      classNames={{
        "expandable-item-grid": style["column__grid"],
        "expandable-item-grid__item": style["column__grid__item"],
      }}
      seeMoreButtonClickCallback={onClickGroup}
      {...{ "data-testid": content_group }}
    />
  );
};
