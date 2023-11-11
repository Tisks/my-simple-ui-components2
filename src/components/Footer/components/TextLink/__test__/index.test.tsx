import React from "react";
import TextLink, { defaultTarget } from "../TextLink";
import { TextLinkProps } from "../types";
import { fireEvent, render, screen } from "@testing-library/react";
import Phone from "wtw-icons/_icons/Phone";

describe("<TextLink />", () => {
  const onClickMock = jest.fn();
  const exampleLink: TextLinkProps = {
    href: "https://www.google.com",
    text: "Google",
    target: "_parent",
    onClick: onClickMock,
    icon: Phone,
  };

  it("Should render a link if href is passed and call onClick with the link's text, href, content group and icon if passed", () => {
    const onClickFn = jest.fn();

    const { rerender } = render(
      <TextLink {...exampleLink} content_group="group" onClick={onClickFn} />
    );

    let link = screen.queryByRole("link");
    expect(link).not.toBeNull();
    expect(link).toHaveTextContent(exampleLink.text!);
    expect(link).toHaveAttribute("href", exampleLink.href);
    expect(link).toHaveAttribute("target", exampleLink.target);

    let icon = screen.queryByTestId(`${exampleLink.text!}-icon`);
    expect(icon).not.toBeNull();

    fireEvent.click(link!);

    expect(onClickFn).toHaveBeenCalledWith(
      exampleLink.text,
      exampleLink.href,
      "group"
    );

    //do not pass icon
    rerender(
      <TextLink {...{ ...exampleLink, icon: undefined }} target={undefined} />
    );

    link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", defaultTarget); //Default value

    icon = screen.queryByTestId(`${exampleLink.text!}-icon`);
    expect(icon).toBeNull();
  });

  it("Should render a text due to not passing it an href and should not call onClick", () => {
    const onClickFn = jest.fn();

    const { rerender } = render(
      <TextLink {...exampleLink} href={undefined} onClick={onClickFn} />
    );

    const link = screen.queryByRole("link");
    expect(link).toBeNull();

    let icon = screen.queryByTestId(`${exampleLink.text!}-icon`);
    expect(icon).not.toBeNull();

    const text = screen.queryByText(exampleLink.text!);
    expect(text).not.toBeNull();

    fireEvent.click(text!);

    expect(onClickFn).not.toHaveBeenCalled();

    rerender(
      <TextLink
        {...{ ...exampleLink, icon: undefined }}
        href={undefined}
        onClick={onClickFn}
      />
    );

    icon = screen.queryByTestId(`${exampleLink.text!}-icon`);
    expect(icon).toBeNull();
  });

  it("Should render nothing due to not passing it an href or text", () => {
    render(<TextLink {...exampleLink} text={undefined} href={undefined} />);

    const link = screen.queryByRole("link");
    expect(link).toBeNull();

    const text = screen.queryByText(exampleLink.text!);
    expect(text).toBeNull();
  });
});
