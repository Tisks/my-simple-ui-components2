import React from "react";
import { render, screen } from "@testing-library/react";
import { ContactDetailsProps } from "../types";
import { legalSectionId } from "../components/LegalSection/LegalSection";
import { socialMediaId } from "../components/SocialMediaIcons/SocialMediaIcons";
import { within } from "@testing-library/dom";
import { ContactDetails } from "..";
import { contactDetailsId } from "../ContactDetails";

describe("<ContactDetails />", () => {
  const contactDetailsProps: ContactDetailsProps = {
    renderSimpleFooter: false,
  };

  it("Should render the legal and social media sections if renderSimpleFooter is false", () => {
    render(<ContactDetails {...contactDetailsProps} />);

    const container = screen.queryByTestId(contactDetailsId);
    expect(container).not.toBeNull();

    const legalSection = within(container!).queryByTestId(legalSectionId);
    expect(legalSection).not.toBeNull();

    const socialMediaSection = within(container!).queryByTestId(socialMediaId);
    expect(socialMediaSection).not.toBeNull();
  });

  it("Should render only the legal section if renderSimpleFooter is true", () => {
    render(<ContactDetails {...contactDetailsProps} renderSimpleFooter />);

    const container = screen.queryByTestId(contactDetailsId);
    expect(container).not.toBeNull();

    const legalSection = within(container!).queryByTestId(legalSectionId);
    expect(legalSection).not.toBeNull();

    const socialMediaSection = within(container!).queryByTestId(socialMediaId);
    expect(socialMediaSection).toBeNull();
  });
});
