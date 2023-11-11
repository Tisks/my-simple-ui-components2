import React, { useMemo } from "react";
import { FooterProps } from "./types";
import FooterDesktop from "./FooterDesktop/FooterDesktop";
import styles from "./footer.module.scss";
import {
  ColumnPropsSections,
  ContactDetails,
} from "./components/ContactDetails";
import { FooterTabletMobile } from "./FooterTabletMobile";
import { defaultColumnData } from "./components/Column/constants";
import { socialMediaIconsColumnData } from "./components/ContactDetails/components/SocialMediaIcons/constants";
import { legalSectionColumnData } from "./components/ContactDetails/components/LegalSection/constants";
import { ColumnPropsArray } from ".";
import { injectPropsOnColumnProps } from "./helpers";
import classNames from "classnames";
import { FooterProvider } from "./context/provider";

export const footerId = "footer-id";
export const defaultLowerSectionColumnData = {
  legalSection: legalSectionColumnData,
  socialMediaInfo: socialMediaIconsColumnData,
};
const Footer: React.FC<FooterProps> = ({
  doRender = true,
  renderSimpleFooter = false,
  isTabletMobile,
  columnData: preColumnData = defaultColumnData,
  lowerSectionColumnData:
    preLowerSectionColumnData = defaultLowerSectionColumnData,
  multiOpen = false,
  clickHandlers,
  usedColumnPropsByLinkColumnId,
  usedColumnInfoPropsByLinkColumnId,
  backgroundColorVariant = "standard",
  LinkWrapper,
}) => {
  // If clickHandlers are passed then inject them to the column data
  // And if you want custom onClick and onClickGroup functions then put them inside each
  // of the arrays in the column data
  const { columnData, lowerSectionColumnData } = useMemo(
    () => ({
      columnData: injectPropsOnColumnProps(
        injectPropsOnColumnProps(
          injectPropsOnColumnProps(preColumnData, { all: clickHandlers || {} }),
          usedColumnPropsByLinkColumnId
        ),
        undefined,
        usedColumnInfoPropsByLinkColumnId
      ) as ColumnPropsArray,
      lowerSectionColumnData: injectPropsOnColumnProps(
        injectPropsOnColumnProps(
          injectPropsOnColumnProps(preLowerSectionColumnData, {
            all: clickHandlers || {},
          }),
          usedColumnPropsByLinkColumnId
        ),
        undefined,
        usedColumnInfoPropsByLinkColumnId
      ) as ColumnPropsSections,
    }),
    [
      clickHandlers,
      usedColumnInfoPropsByLinkColumnId,
      usedColumnPropsByLinkColumnId,
      preColumnData,
      preLowerSectionColumnData,
    ]
  );

  //This is a flag just to not render the footer in the first place
  if (!doRender) {
    return <div dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />;
  }

  const footerClassNames = classNames(
    styles["footer"],
    styles[`footer--${backgroundColorVariant}`]
  );

  return (
    <FooterProvider
      LinkWrapper={LinkWrapper}
      backgroundColorVariant={backgroundColorVariant}
    >
      <footer
        data-testid={footerId}
        className={footerClassNames}
        style={{
          ...(renderSimpleFooter ? { paddingTop: "0px" } : {}),
        }}
      >
        {!renderSimpleFooter &&
          (isTabletMobile ? (
            <FooterTabletMobile columnData={columnData} multiOpen={multiOpen} />
          ) : (
            <FooterDesktop columnData={columnData} />
          ))}

        {!renderSimpleFooter && !isTabletMobile && (
          <hr role="separator" className={styles["footer__divider"]} />
        )}

        <ContactDetails
          isTabletMobile={isTabletMobile}
          renderSimpleFooter={renderSimpleFooter}
          lowerSectionColumnData={lowerSectionColumnData}
        />
      </footer>
    </FooterProvider>
  );
};

export default Footer;
