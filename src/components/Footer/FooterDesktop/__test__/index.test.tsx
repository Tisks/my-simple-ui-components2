import React from "react";
import { render, screen } from "@testing-library/react";
import Desktop, { footerDesktopId } from "../FooterDesktop";
import { defaultColumnData } from "../../components/Column/constants";
import { getDataTestId } from "../../../shared/layouts";

describe("<Desktop />", () => {
  it("Should render an accordion with the AboutColumn, DestinationColumns, BlogColumn and PressColumn components in grid mode (default props)", () => {
    render(<Desktop />);

    const footerDesktopVersion = screen.queryByTestId(footerDesktopId);
    expect(footerDesktopVersion).not.toBeNull();

    for (const column of defaultColumnData) {
      if (column.content_group) {
        const expandableItemGrid = screen.queryByTestId(
          getDataTestId(column.content_group)
        );
        expect(expandableItemGrid).not.toBeNull();
      }
    }
  });
});
