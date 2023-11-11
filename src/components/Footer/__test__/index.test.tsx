import React from "react";
import { Footer } from "..";
import { render, screen, within } from "@testing-library/react";
import { footerId } from "../Footer";
import { contactDetailsId } from "../components/ContactDetails/ContactDetails";
import { footerTabletMobileId } from "../FooterTabletMobile/FooterTabletMobile";
import { footerDesktopId } from "../FooterDesktop/FooterDesktop";

describe("<Footer />", () => {
  let footer, footerTabletDesktop, footerDesktop, separator, contactDetails;
  it("Should not render anything if the doRender prop is true", () => {
    render(<Footer doRender={false} />);

    footer = screen.queryByTestId(footerId);
    expect(footer).toBeNull();
  });

  it("Should only render the contact details component if the renderSimpleFooter prop is true", () => {
    render(<Footer renderSimpleFooter />);

    footer = screen.getByTestId(footerId);

    footerTabletDesktop = within(footer).queryByTestId(footerTabletMobileId);

    footerDesktop = within(footer).queryByTestId(footerDesktopId);

    expect(footerDesktop).toBeNull();
    expect(footerTabletDesktop).toBeNull();

    //It doesn't have a separator hr
    separator = within(footer).queryByRole("separator");
    expect(separator).toBeNull();

    contactDetails = within(footer).queryByTestId(contactDetailsId);
    expect(contactDetails).not.toBeNull();
  });

  it("Should render the tabletMobile version if the tabletMobile prop is true", () => {
    render(<Footer isTabletMobile />);

    footer = screen.getByTestId(footerId);

    footerTabletDesktop = within(footer).queryByTestId(footerTabletMobileId);

    footerDesktop = within(footer).queryByTestId(footerDesktopId);

    expect(footerDesktop).toBeNull();
    expect(footerTabletDesktop).not.toBeNull();

    //It doesn't have a separator hr in this version
    separator = within(footer).queryByRole("separator");
    expect(separator).toBeNull();

    contactDetails = within(footer).queryByTestId(contactDetailsId);
    expect(contactDetails).not.toBeNull();
  });
  
  it("Should render the Desktop version if the tabletMobile prop is false", () => {
    render(<Footer />);

    footer = screen.getByTestId(footerId);

    footerTabletDesktop = within(footer).queryByTestId(footerTabletMobileId);

    footerDesktop = within(footer).queryByTestId(footerDesktopId);

    expect(footerDesktop).not.toBeNull();
    expect(footerTabletDesktop).toBeNull();

    //It does have a separator hr
    separator = within(footer).queryByRole("separator");
    expect(separator).not.toBeNull();

    contactDetails = within(footer).queryByTestId(contactDetailsId);
    expect(contactDetails).not.toBeNull();
  });
});
