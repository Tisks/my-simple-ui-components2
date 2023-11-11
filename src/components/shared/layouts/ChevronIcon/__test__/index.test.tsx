import React from "react";
import { render, screen } from "@testing-library/react";
import { ChevronIcon } from "..";
import { determineRotationAngle } from "../ChevronIcon";

describe("Chevron component", () => {
  it("Should render the chevron icon with a custom rotation angle ", () => {
    const { rerender } = render(
      <ChevronIcon direction="up" rotationAngle={90} />
    );

    let icon = screen.queryByTestId("up-icon");

    expect(icon).toHaveAttribute(
      "transform",
      `rotate(${determineRotationAngle("up", 90)})`
    );

    rerender(<ChevronIcon direction="down" rotationAngle={90} />);

    icon = screen.queryByTestId("down-icon");

    expect(icon).toHaveAttribute(
      "transform",
      `rotate(${determineRotationAngle("down", 90)})`
    );
  });

  it("Should render the chevron icon with the default angle ", () => {
    const { rerender } = render(<ChevronIcon direction="up" />);

    let icon = screen.queryByTestId("up-icon");

    expect(icon).toHaveAttribute(
      "transform",
      `rotate(${determineRotationAngle("up")})`
    );

    rerender(<ChevronIcon direction="down" />);

    icon = screen.queryByTestId("down-icon");

    expect(icon).toHaveAttribute(
      "transform",
      `rotate(${determineRotationAngle("down")})`
    );
  });
});
