import React from "react";
import {
  render,
  screen,
  within,
  act,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import { ExpandableItemGrid, getDataTestId } from "..";

const defaultNumChildren = 7;
export const generateChildrenArray = (): JSX.Element[] => {
  const childrenArray = [];
  for (let i = 0; i < defaultNumChildren; i++) {
    childrenArray.push(<div key={i}>Child {i}</div>);
  }
  return childrenArray;
};

describe("ExpandableItemGrid", () => {
  const title = "Test Title";
  const childrenArray = generateChildrenArray();
  const itemsOnSightLimit = defaultNumChildren - 3;
  const validButton = "Valid Button";
  const appeared = "I appear when clicking the button";

  const CustomButton: React.FC<{
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  }> = ({ isExpanded, setIsExpanded }) => {
    return (
      <>
        {isExpanded && <p>{appeared}</p>}
        <button
          role="button"
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
        >
          {isExpanded !== undefined && setIsExpanded !== undefined
            ? validButton
            : "Invalid"}
        </button>
      </>
    );
  };

  it("Should render the item grid with a title, children and a button if itemsOnSightLimit is provided", () => {
    render(
      <ExpandableItemGrid
        title={title}
        childrenArray={childrenArray}
        itemsOnSightLimit={itemsOnSightLimit}
        doWrapChildrenOnListItem
      />
    );

    const expandableItemGrid = screen.queryByTestId(getDataTestId());
    expect(expandableItemGrid).not.toBeNull();

    const listItems = within(expandableItemGrid!).queryAllByRole("listitem");
    expect(listItems).toHaveLength(itemsOnSightLimit + 2); // itemsOnSightLimit children + 1 title + 1 button

    const titleListItem = listItems[0];

    //If a string is passed then the default has a heading role
    const titleComponent = within(titleListItem).queryByRole("heading");
    expect(titleComponent).not.toBeNull();
    expect(titleComponent).toHaveTextContent(title);

    //The last component is the button
    const seeMoreButton = screen.queryByRole("button");
    expect(seeMoreButton).not.toBeNull();

    const childrenListItems = listItems.slice(1, listItems.length - 1); // the rest of the items are children

    //Check that the children are rendered
    for (const [index, child] of childrenListItems.entries()) {
      expect(child).toHaveTextContent(`Child ${index}`);
    }
  });

  it("Should render the item grid with a title, children but not a button if itemsOnSightLimit is not provided", () => {
    render(
      <ExpandableItemGrid
        title={title}
        childrenArray={childrenArray}
        doWrapChildrenOnListItem
      />
    );

    const seeMoreButton = screen.queryByRole("button");
    expect(seeMoreButton).toBeNull();
  });

  it("Should not render the item grid if itemsOnSightLimit is negative", () => {
    render(
      <ExpandableItemGrid
        title={title}
        childrenArray={childrenArray}
        itemsOnSightLimit={-itemsOnSightLimit}
        doWrapChildrenOnListItem
      />
    );

    const expandableItemGrid = screen.queryByTestId(getDataTestId());
    expect(expandableItemGrid).toBeNull();
  });

  it("Should not render the item grid's see more button if itemsOnSightLimit is bigger or equal to the childrenArray's length (nothing to hide)", () => {
    render(
      <ExpandableItemGrid
        title={title}
        childrenArray={childrenArray}
        itemsOnSightLimit={defaultNumChildren}
        doWrapChildrenOnListItem
      />
    );

    let seeMoreButton = screen.queryByRole("button");
    expect(seeMoreButton).toBeNull();

    cleanup();

    render(
      <ExpandableItemGrid
        title={title}
        childrenArray={childrenArray}
        itemsOnSightLimit={defaultNumChildren + 1}
      />
    );

    seeMoreButton = screen.queryByRole("button");
    expect(seeMoreButton).toBeNull();
  });

  describe("Should render components depending if props are passed (title and button)", () => {
    it("Should render the item grid without a title if its not passed", () => {
      render(
        <ExpandableItemGrid
          childrenArray={childrenArray}
          doWrapChildrenOnListItem
        />
      );

      const listItems = screen.getAllByRole("listitem");
      const titleItem = listItems[0];

      const supposedTitle = within(titleItem).queryByRole("heading");
      expect(supposedTitle).toBeNull();
    });

    it("Should render the item grid with a custom component as title if its passed", () => {
      const title = <a>Link as title</a>;

      render(
        <ExpandableItemGrid
          title={title}
          childrenArray={childrenArray}
          doWrapChildrenOnListItem
        />
      );

      const listItems = screen.getAllByRole("listitem");
      const titleItem = listItems[0];

      const linkAsTitle = within(titleItem).queryByRole("link");
      expect(linkAsTitle).toBeNull();
    });

    it("Should render the item grid with a custom component as button if its passed", () => {
      render(
        <ExpandableItemGrid
          title={title}
          childrenArray={childrenArray}
          itemsOnSightLimit={itemsOnSightLimit}
          //@ts-ignore // This is to test the custom button
          SeeMoreButton={<CustomButton />}
          doWrapChildrenOnListItem
        />
      );

      // Check that the custom button exists in the rendered component
      const customButtonElement = screen.queryByRole("button");
      expect(customButtonElement).not.toBeNull();
      expect(customButtonElement).toHaveTextContent(validButton);
    });
  });

  it("Should show all the items if the see more button is clicked and hide till we have itemsOnSightLimit number of items when clicked again aka collapse", () => {
    render(
      <ExpandableItemGrid
        title={title}
        childrenArray={childrenArray}
        itemsOnSightLimit={itemsOnSightLimit}
        doWrapChildrenOnListItem
      />
    );

    let listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(itemsOnSightLimit + 2); // itemsOnSightLimit children + 1 title + 1 button

    const button = screen.getByRole("button");

    act(() => {
      fireEvent.click(button);
    });

    // Now, all children should be visible
    listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(defaultNumChildren + 2); // defaultNumChildren children + 1 title + 1 button

    // Now collapse so we have the itemsOnSightLimit number of items
    act(() => {
      fireEvent.click(button);
    });

    // Now, all children should be visible
    listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(itemsOnSightLimit + 2); // itemsOnSightLimit children + 1 title + 1 button
  });

  it("Should pass the isExpanded and setIsExpanded props to a custom component passed as button", () => {
    render(
      <ExpandableItemGrid
        title="Test Title"
        //@ts-ignore // This is to test the custom button
        SeeMoreButton={<CustomButton />}
        childrenArray={childrenArray}
        itemsOnSightLimit={itemsOnSightLimit}
        doWrapChildrenOnListItem
      />
    );

    const customButtonElement = screen.getByRole("button");

    //At the start the text is not there
    let extraText = screen.queryByText(appeared);
    expect(extraText).toBeNull();

    // Simulate a click on the custom button
    act(() => {
      fireEvent.click(customButtonElement!);
    });

    //Now the isExpanded is true so the text should appear
    extraText = screen.queryByText(appeared);
    expect(extraText).not.toBeNull();
  });
});
