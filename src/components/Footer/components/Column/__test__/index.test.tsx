import React from "react";
import { aboutInfo, pressInfo } from "../constants";
import { ColumnAccordionItem, ColumnProps } from "..";
import { ColumnDesktop, TextLinks } from "../..";
import { Accordion } from "../../../../Accordion";
import {
  within,
  render,
  screen,
  act,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { getDataTestId } from "../../../../shared/layouts/ExpandableItemGrid";
import { defaultSeeMoreText } from "../../../../shared/layouts/ExpandableItemGrid/components/DefaultSeeMoreButton";

export const checkCorrectInfoInLinkList = (
  linkItems: HTMLLinkElement[],
  columnInfo: TextLinks
) => {
  for (const [index, link] of linkItems.entries()) {
    columnInfo[index].href &&
      expect(link).toHaveAttribute("href", columnInfo[index].href);
    if (columnInfo[index].text) {
      expect(link).toHaveTextContent(columnInfo[index].text!);
    }
  }
};

describe("<Column />", () => {
  describe("Should render both versions (accordion and grid) with both having the same title", () => {
    it("TabletMobile version (Accordion)", () => {
      render(
        <Accordion
          items={[ColumnAccordionItem(pressInfo)]}
          multiOpen={false}
          variant="compact"
          iconThickness="3"
        />
      );

      const accordionButton = screen.queryByRole("button");
      expect(accordionButton).not.toBeNull();
      expect(accordionButton).toHaveTextContent((pressInfo.title as string)!);
    });

    it("Expandable grid item version", () => {
      render(<ColumnDesktop {...pressInfo} />);

      const component = screen.queryByTestId(
        getDataTestId(pressInfo.content_group!)
      );
      expect(component).not.toBeNull();

      const titleComponent = within(component!).queryByText(
        (pressInfo.title as string)!
      );
      expect(titleComponent).not.toBeNull();
    });
  });

  describe("Should render both versions (accordion and grid) with both having the same links", () => {
    it("Should render the accordion version and the links if the accordion button is pressed", () => {
      render(
        <Accordion
          items={[ColumnAccordionItem(pressInfo)]}
          multiOpen={false}
          variant="compact"
          iconThickness="3"
        />
      );
      //Actually all the links are in the DOM initially but when clicking the accordion button these appear
      const accordionButton = screen.getByRole("button");

      act(() => {
        fireEvent.click(accordionButton);
      });

      const links: HTMLLinkElement[] = screen.queryAllByRole("link");
      expect(links.length).toBe(pressInfo.columnInfo.length); //All the links are visible

      checkCorrectInfoInLinkList(links, pressInfo.columnInfo);

      //Also in this version we don't have the see more button by default
      const showMoreButton = screen.queryByText(defaultSeeMoreText(false));
      expect(showMoreButton).toBeNull();
    });

    it("Should render the expandable grid item version and show them with a show more button", () => {
      const checkShowMoreButton = (columnProps: ColumnProps) => {
        cleanup();
        render(<ColumnDesktop {...columnProps} />);

        const { content_group, itemsOnSightLimit, columnInfo } = columnProps;
        const component = screen.getByTestId(getDataTestId(content_group!));

        const showMoreButton = within(component!).queryByRole("button");

        //If we have itemsOnSightLimit then the show more button exists otherwise it doesn't
        itemsOnSightLimit
          ? expect(showMoreButton).not.toBeNull()
          : expect(showMoreButton).toBeNull();

        //If we have itemsOnSightLimit then continue with the test otherwise we don't have to
        if (itemsOnSightLimit) {
          //Click the show more button
          act(() => {
            fireEvent.click(showMoreButton!);
          });

          links = within(component!).queryAllByRole("link");
          expect(links.length).toBe(columnInfo.length); //Now there should be all the links in the dom

          checkCorrectInfoInLinkList(links, columnInfo);

          //Click the show more button again
          act(() => {
            fireEvent.click(showMoreButton!);
          });

          links = within(component!).queryAllByRole("link");
          expect(links.length).toBe(itemsOnSightLimit); //Now there should be the collapsed version aka default number of links
        }
        cleanup();
      };

      render(<ColumnDesktop {...pressInfo} />);

      const { content_group, itemsOnSightLimit, columnInfo } = pressInfo;
      const component = screen.getByTestId(getDataTestId(content_group!));

      let links: HTMLLinkElement[] = within(component!).queryAllByRole("link");
      //There's default number of links in the first place OR, if itemsOnSightLimit is undefined,
      //then we have all the links in the first place
      expect(links.length).toBe(itemsOnSightLimit || columnInfo.length);

      checkCorrectInfoInLinkList(links, columnInfo);

      //Now... there's 2 types of info columns: With or without itemsOnSightLimit
      //By default, pressInfo has itemsOnSightLimit but aboutInfo doesn't

      checkShowMoreButton(pressInfo);

      checkShowMoreButton(aboutInfo);
    });
  });

  describe("Should call the onClick function when clicking a link independently of the layout version", () => {
    const onClick = jest.fn();
    it("TabletMobile version (Accordion)", () => {
      render(
        <Accordion
          items={[ColumnAccordionItem({ ...pressInfo, onClick })]}
          multiOpen={false}
          variant="compact"
          iconThickness="3"
        />
      );
      const links: HTMLLinkElement[] = screen.queryAllByRole("link");

      fireEvent.click(links[0]);
      const firstLink = pressInfo.columnInfo[0];
      expect(onClick).toHaveBeenCalledWith(
        firstLink.text!,
        firstLink.href!,
        pressInfo.content_group!
      );
    });

    it("Expandable grid item version", () => {
      render(<ColumnDesktop {...pressInfo} />);

      const links: HTMLLinkElement[] = screen.queryAllByRole("link");

      fireEvent.click(links[0]);
      const firstLink = pressInfo.columnInfo[0];
      expect(onClick).toHaveBeenCalledWith(
        firstLink.text!,
        firstLink.href!,
        pressInfo.content_group!
      );
    });
  });

  describe("Should call the onClickGroup function in a different way depending on the layout version", () => {
    it("Should call the onClickGroup function in accordion version if the accordion button is clicked", () => {
      const onClickGroup = jest.fn();
      render(
        <Accordion
          items={[ColumnAccordionItem({ ...pressInfo, onClickGroup })]}
          multiOpen={false}
          variant="compact"
          iconThickness="3"
        />
      );
      const accordionButton = screen.getByRole("button");

      act(() => {
        fireEvent.click(accordionButton);
      });

      expect(onClickGroup).toHaveBeenCalledWith(true, pressInfo.content_group!);

      act(() => {
        fireEvent.click(accordionButton);
      });

      expect(onClickGroup).toHaveBeenCalledWith(
        false,
        pressInfo.content_group!
      );
    });

    it("Should call the onClickGroup function in the expandable grid item version if the see more button is clicked", () => {
      const onClickGroup = jest.fn();

      render(<ColumnDesktop {...pressInfo} onClickGroup={onClickGroup} />);

      const component = screen.getByTestId(
        getDataTestId(pressInfo.content_group!)
      );

      const seeMoreButton = within(component!).getByRole("button");

      act(() => {
        fireEvent.click(seeMoreButton!);
      });

      expect(onClickGroup).toHaveBeenCalledWith(true, pressInfo.content_group!);

      act(() => {
        fireEvent.click(seeMoreButton!);
      });

      expect(onClickGroup).toHaveBeenCalledWith(
        false,
        pressInfo.content_group!
      );
    });
  });
});
