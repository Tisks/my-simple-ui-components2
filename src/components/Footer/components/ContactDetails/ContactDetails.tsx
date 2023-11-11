import React, { FC } from "react";
import { ContactDetailsProps } from "./types";
import styles from "./contactDetails.module.scss";
import { SocialMediaIcons } from ".";
import { LegalSection } from "./components/LegalSection";
import { socialMediaIconsColumnData } from "./components/SocialMediaIcons/constants";
import { legalSectionColumnData } from "./components/LegalSection/constants";

export const contactDetailsId = "contact-details";
const ContactDetails: FC<ContactDetailsProps> = ({
  lowerSectionColumnData = {
    legalSection: legalSectionColumnData,
    socialMediaInfo: socialMediaIconsColumnData,
  },
  renderSimpleFooter,
  isTabletMobile,
}) => {
  const paddingInline = { "--padding-inline": isTabletMobile ? "16px" : "0px" };
  return (
    <section
      data-testid={contactDetailsId}
      className={styles["contact-details"]}
      //@ts-ignore
      style={{
        ...paddingInline,
      }}
    >
      <LegalSection columnProps={lowerSectionColumnData.legalSection!} />
      {!renderSimpleFooter && (
        <SocialMediaIcons
          columnProps={lowerSectionColumnData.socialMediaInfo!}
        />
      )}
    </section>
  );
};

export default ContactDetails;
