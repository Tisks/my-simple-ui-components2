import React from "react";
import LinkList from "../LinkList";
import { render, screen } from "@testing-library/react";

describe("<LinkList />", () => {
  const columnInfo = [
    {
      href: "https://www.google.com",
      text: "Google",
    },
    {
      href: "https://www.twitter.com",
      text: "Twitter",
      target: "_self",
    },
    {
      href: "https://www.facebook.com",
      text: "Facebook",
      target: "_blank",
    },
  ];

  const content_group = "topic";

  it("Should render an unordered list of links", () => {
    const list = LinkList({ columnInfo, content_group });

    render(<>{list}</>);

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(columnInfo.length);
  });
});
