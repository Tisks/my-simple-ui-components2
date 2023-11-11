import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { Accordion, getContentContainerId } from "..";

export const mockItems = (onClick?: jest.Mock<any, any>[]) => [
  {
    title: "What is Lorem Ipsum?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    onClick: onClick?.[0],
  },
  {
    title: "Why do we use it?",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    onClick: onClick?.[1],
  },
];

describe("Accordion component", () => {
  const items = mockItems();

  it("Should render accordion items with hidden content", () => {
    render(<Accordion items={items} />);

    let title, content;

    // Check if all accordion items are initially rendered
    for (const [index, item] of items.entries()) {
      title = screen.queryByText(item.title);
      expect(title).not.toBeNull();

      // Check if content for each item is initially hidden
      content = screen.queryByTestId(`${getContentContainerId(index)}`);
      expect(content).toHaveClass("content"); //If it doesn't have the 'active' class then is hidden
    }
  });

  it("Should be able to toggle one item open by clicking the title and make the content appear and click again and hide it in both multiOpen false and true", () => {
    render(<Accordion items={items} />);

    // Click on the first item to open it
    let item1Title = screen.getByText(items[0].title);
    let item1Content =  screen.queryByTestId(`${getContentContainerId(0)}`);

    fireEvent.click(item1Title);

    // Check if content for the first item is visible
    expect(item1Content).toHaveClass("content active");

    fireEvent.click(item1Title);

    // Check if content for the first item is hidden
    expect(item1Content).toHaveClass("content");

    cleanup();

    render(<Accordion items={items} multiOpen={false} />);

    // Click on the first item to open it
    item1Title = screen.getByText(items[0].title);
    item1Content = screen.queryByTestId(`${getContentContainerId(0)}`);

    fireEvent.click(item1Title);

    // Check if content for the first item is visible
    expect(item1Content).toHaveClass("content active");

    fireEvent.click(item1Title);

    // Check if content for the first item is hidden
    expect(item1Content).toHaveClass("content");
  });

  describe("Behavior depending on multi open prop", () => {
    it("Should be able to toggle one item open and close it if another is toggled if the multiOpen prop is false", () => {
      render(<Accordion items={items} multiOpen={false} />);

      // Click on the first item to open it
      const item1Title = screen.getByText(items[0].title);
      const item1Content = screen.queryByTestId(`${getContentContainerId(0)}`);

      const item2Title = screen.getByText(items[1].title);
      const item2Content = screen.queryByTestId(`${getContentContainerId(1)}`);

      fireEvent.click(item1Title);

      // Check if content for the first item is visible
      expect(item1Content).toHaveClass("content active");

      fireEvent.click(item2Title);

      //By clicking other item it hides the original one
      expect(item1Content).toHaveClass("content");
      //And show the one clicked
      expect(item2Content).toHaveClass("content active");
    });

    it("Should be able to toggle one item open and another one and it shouldn't close the original one so we can have multiple open if multiOpen prop is true", () => {
      render(<Accordion items={items} multiOpen />);

      // Click on the first item to open it
      const item1Title = screen.getByText(items[0].title);
      const item1Content = screen.queryByTestId(`${getContentContainerId(0)}`);

      const item2Title = screen.getByText(items[1].title);
      const item2Content = screen.queryByTestId(`${getContentContainerId(1)}`);

      fireEvent.click(item1Title);
      fireEvent.click(item2Title);

      //Both can be shown at the same time
      expect(item1Content).toHaveClass("content active");
      expect(item2Content).toHaveClass("content active");
    });
  });
});
