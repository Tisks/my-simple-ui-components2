import React from "react";
import { legalSectionColumnData } from "../constants";
import { render, screen, within } from "@testing-library/react";
import LegalSection, { legalSectionId } from "../LegalSection";
import { checkCorrectInfoInLinkList } from "../../../../Column/__test__/index.test";
import { addPrefixUrl } from "../../../../TextLink/utils";

describe("<LegalSection />", () => {
  const columnInfo = addPrefixUrl(
    legalSectionColumnData.columnInfo,
    undefined,
    legalSectionColumnData.baseUrl
  );

  const checkStaticInfo = () => {
    columnInfo.forEach(({ text }) => {
      text && expect(screen.queryByText(text)).not.toBeNull();
    });
  };

  it("Should render the link list desktop", () => {
    render(<LegalSection columnProps={legalSectionColumnData} />);

    const container = screen.getByTestId(legalSectionId);

    const links: HTMLLinkElement[] = within(container!).queryAllByRole("link");

    expect(links.length).toBe(columnInfo.length - 1); //There's a text in there

    checkStaticInfo();

    const usedColumnInfo = columnInfo.filter((props) => props.href); //Lets get only the links here

    checkCorrectInfoInLinkList(links, usedColumnInfo);
  });
});
