import React from "react";
import { FooterTabletMobileProps } from "./types";
import { Accordion } from "../..";
import styles from "./footerTabletMobile.module.scss";
import { defaultColumnData } from "../components/Column/constants";
import { ColumnAccordionItem } from "../components";
import { useFooterContext } from "../hooks/useFooterContext";

export const footerTabletMobileId = "footer-tablet-mobile";
const FooterTabletMobile: React.FC<FooterTabletMobileProps> = ({
  multiOpen,
  columnData = defaultColumnData,
}) => {
  const { LinkWrapper } = useFooterContext();

  return (
    <section
      data-testid={footerTabletMobileId}
      className={styles["footer-tablet-mobile"]}
    >
      <Accordion
        variant="compact"
        iconThickness="3"
        multiOpen={multiOpen}
        items={columnData.map((props) =>
          ColumnAccordionItem({ ...props, OverallLinkWrapper: LinkWrapper })
        )}
      />
    </section>
  );
};

export default FooterTabletMobile;
