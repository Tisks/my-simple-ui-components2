import React, { FC } from "react";
import { LegalSectionProps } from "./types";
import { LinkList } from "../../..";
import styles from "./legalSection.module.scss";
import { addPrefixUrl } from "../../../TextLink/utils";
import { useFooterContext } from "../../../../hooks/useFooterContext";
import classNames from "classnames";
import { useGetUsedLinkWrapper } from "../../../../hooks/useGetUsedLinkWrapper";

export const legalSectionId = "legal-section";
const LegalSection: FC<LegalSectionProps> = ({ columnProps, LinkWrapper }) => {
  const {
    columnInfo = [],
    content_group,
    baseUrl,
    enableSubPathsOnly,
    onClick,
  } = columnProps || {};
  const { backgroundColorVariant } = useFooterContext();

  const { usedLinkWrapper, enableSubPathsOnly: usedEnableSubPathsOnly } = useGetUsedLinkWrapper(
    enableSubPathsOnly,
    LinkWrapper
  );

  const listItemTextClasses = classNames(
    styles["legal-section__list__item__text"],
    {
      [styles["legal-section__list__item__text--standard"]]:
        backgroundColorVariant === "standard",
    }
  );

  const listItemLinkClasses = classNames(
    styles["legal-section__list__item__link"],
    {
      [styles["legal-section__list__item__link--standard"]]:
        backgroundColorVariant === "standard",
    }
  );
  return (
    <section className={styles["legal-section"]} data-testid={legalSectionId}>
      <ul className={styles["legal-section__list"]}>
        {LinkList({
          columnInfo: addPrefixUrl(columnInfo, usedEnableSubPathsOnly, baseUrl),
          content_group,
          classNames: {
            "link-list__list__item": styles["legal-section__list__item"],
            "link-list__list__item__text": listItemTextClasses,
            "link-list__list__item__link": listItemLinkClasses,
          },
          onClick,
          LinkWrapper: usedLinkWrapper, //Prefer the passed to the footer over the individual one
        })}
      </ul>
    </section>
  );
};

export default LegalSection;
