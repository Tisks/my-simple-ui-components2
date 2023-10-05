import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "..";

describe("<Button/>", () => {
  test("renders a button with the provided label", () => {
    const label = "Click me";
    render(<Button label={label} />);
    const buttonElement = screen.getByText(label);
    expect(buttonElement).not.toBeNull();
  });

  test("renders a primary button with correct styles", () => {
    render(<Button primary label={""} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("storybook-button--primary");
  });

  test("renders a secondary button with correct styles", () => {
    render(<Button label={""} />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("storybook-button--secondary");
  });
});
