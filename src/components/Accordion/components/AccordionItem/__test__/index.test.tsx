import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AccordionItem } from "..";
import { mockItems } from "../../../__test__/index.test";
import { _setOpenIndexes } from "../../../Accordion";
import { userEvent } from "@testing-library/user-event";
describe("AccordionItem component", () => {
  it("Should call the onClick event with the object that informs if the item was opened/closed, the index and the mouse event", async () => {
    let openIndexes: number[] = [];

    const onClick = jest.fn();
    const items = mockItems([onClick]);

    const toggleItemFn = jest.fn((index: number) => {
      const actualIndexes = _setOpenIndexes(openIndexes, index, true);
      openIndexes = actualIndexes;
    });
    const isItemOpenFn = jest.fn((index: number) => {
      const isOpen = openIndexes.includes(index);
      return isOpen;
    });

    render(
      <AccordionItem
        index={0}
        item={items[0]}
        iconOrientation="left"
        toggleItem={toggleItemFn}
        isItemOpen={isItemOpenFn}
      />
    );

    const item1Title = screen.getByText(items[0].title);

    userEvent.click(item1Title);

    // Use await to ensure the component updates
    await waitFor(() => {
      //Is opened
      expect(onClick).toHaveBeenCalledWith({
        isExpanded: false,
        index: 0,
        e: expect.any(Object),
      });
    });

    userEvent.click(item1Title);

    // Use await again
    await waitFor(() => {
      //Is closed
      expect(onClick).toHaveBeenCalledWith({
        isExpanded: true,
        index: 0,
        e: expect.any(Object),
      });
    });
  });

  it("Should render the icon on the left or right depending on the prop", () => {
    const onClick = jest.fn();
    const toggleItemFn = jest.fn();
    const isItemOpenFn = jest.fn();
    const items = mockItems([onClick]);

    const { rerender } = render(
      <AccordionItem
        index={0}
        item={items[0]}
        iconOrientation="left"
        toggleItem={toggleItemFn}
        isItemOpen={isItemOpenFn}
      />
    );

    //The accordion item button has a data-testid that is an identifier to know if the icon is rendered on the left or right

    let button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-testid", `item-icon-left-orientation`);

    rerender(
      <AccordionItem
        index={0}
        item={items[0]}
        iconOrientation="right"
        toggleItem={toggleItemFn}
        isItemOpen={isItemOpenFn}
      />
    );

    button = screen.getByRole("button");
    expect(button).toHaveAttribute(
      "data-testid",
      `item-icon-right-orientation`
    );
  });

  it("Should render the button with a custom class that happens when titleOnlyHasBottomBorder is true and hasBorder is false", () => {
    const onClick = jest.fn();
    const toggleItemFn = jest.fn();
    const isItemOpenFn = jest.fn();
    const items = mockItems([onClick]);

    render(
      <AccordionItem
        index={0}
        item={items[0]}
        iconOrientation="left"
        toggleItem={toggleItemFn}
        isItemOpen={isItemOpenFn}
        titleOnlyHasBottomBorder
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("title title--has-only-bottom-border");
  });
});
