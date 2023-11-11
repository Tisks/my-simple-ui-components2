import React from "react";
import { socialMediaIconsColumnData } from "../constants";
import { fireEvent, render, screen, within } from "@testing-library/react";
import SocialMediaIcons, { socialMediaId } from "../SocialMediaIcons";
import { checkCorrectInfoInLinkList } from "../../../../Column/__test__/index.test";
import { addPrefixUrl } from "../../../../TextLink/utils";

describe("<SocialMediaIcons />", () => {
  const columnInfo = addPrefixUrl(
    socialMediaIconsColumnData.columnInfo,
    undefined,
    socialMediaIconsColumnData.baseUrl
  );

  it("Should render the link list desktop", () => {
    render(<SocialMediaIcons columnProps={socialMediaIconsColumnData} />);

    const container = screen.getByTestId(socialMediaId);

    const links: HTMLLinkElement[] = within(container!).queryAllByRole("link");

    expect(links.length).toBe(columnInfo.length);

    checkCorrectInfoInLinkList(links, columnInfo);
  });

  it("Should call onClick callback if its passed when clicking a link", () => {
    let onClick = jest.fn();

    const { rerender } = render(
      <SocialMediaIcons
        columnProps={{ ...socialMediaIconsColumnData, onClick }}
      />
    );

    let container = screen.getByTestId(socialMediaId);

    let links: HTMLLinkElement[] = within(container!).queryAllByRole("link");
    let firstLink = socialMediaIconsColumnData.columnInfo[0];

    fireEvent.click(links[0]);

    expect(onClick).toHaveBeenCalledWith(
      firstLink.text,
      firstLink.href!,
      socialMediaIconsColumnData.content_group!
    );

    rerender(<SocialMediaIcons columnProps={socialMediaIconsColumnData} />);

    onClick = jest.fn();

    container = screen.getByTestId(socialMediaId);

    links = within(container!).queryAllByRole("link");
    firstLink = socialMediaIconsColumnData.columnInfo[0];

    fireEvent.click(links[0]);

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
