import React from "react";
import { render, screen, within } from "@testing-library/react";
import TabletMobile, { footerTabletMobileId } from "../FooterTabletMobile";
import { defaultColumnData } from "../../components/Column/constants";

describe("<TabletMobile />", () => {
  let button: HTMLButtonElement | null;
  const checkAccordionMode = (section: HTMLElement) => {
    button = within(section).queryByRole("button");
    expect(button).not.toBeNull();
  };

  it("Should render an accordion with the AboutColumn, DestinationColumns, BlogColumn and PressColumn components in accordion mode (default props)", () => {
    render(<TabletMobile />);
    const footerTabletMobileVersion =
      screen.queryByTestId(footerTabletMobileId);

    expect(footerTabletMobileVersion).not.toBeNull();

    let section: HTMLElement | null;
    for (const column of defaultColumnData) {
      if (column.content_group) {
        section = screen.queryByTestId(column.content_group);
        expect(section).not.toBeNull();

        checkAccordionMode(section!);
      }
    }
  });
});
