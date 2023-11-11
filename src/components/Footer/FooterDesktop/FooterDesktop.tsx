import React from "react";
import { FooterDesktopProps } from "./types";
import styles from "./footerDesktop.module.scss";
import { defaultColumnData } from "../components/Column/constants";
import { ColumnDesktop } from "..";

export const footerDesktopId = "footer-desktop";
const FooterDesktop: React.FC<FooterDesktopProps> = ({
  columnData = defaultColumnData,
}) => {
  return (
    <section data-testid={footerDesktopId} className={styles["footer-desktop"]}>
      {columnData.map((props, index) => (
        <ColumnDesktop key={index} {...props} />
      ))}
    </section>
  );
};

export default FooterDesktop;
