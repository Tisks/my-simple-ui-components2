import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import DefaultSeeMoreButton, {
  defaultSeeMoreText,
} from "../DefaultSeeMoreButton";

describe("DefaultSeeMoreButton", () => {
  const showMoreText = (isExpanded: boolean) =>
    `Custom Show ${isExpanded ? "Less" : "More"}`;

  it("Should render the button with showMoreText or defaultSeeMoreText", () => {
    render(<DefaultSeeMoreButton setIsExpanded={() => {}} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeNull();

    const buttonText = screen.queryByText(defaultSeeMoreText(false));
    expect(buttonText).not.toBeNull();

    // You can also test with custom showMoreText
    render(
      <DefaultSeeMoreButton
        setIsExpanded={() => {}}
        showMoreText={showMoreText}
      />
    );
    const customButtonText = screen.queryByText("Custom Show More");
    expect(customButtonText).not.toBeNull();
  });

  it("Should handle click and toggles isExpanded state", () => {
    const setIsExpanded = jest.fn();
    render(<DefaultSeeMoreButton setIsExpanded={setIsExpanded} />);
    const button = screen.getByRole("button");

    expect(setIsExpanded).toHaveBeenCalledTimes(1);
    expect(setIsExpanded).toHaveBeenCalledWith(false);

    act(() => {
      fireEvent.click(button);
    });
    expect(setIsExpanded).toHaveBeenCalledTimes(2);
    expect(setIsExpanded).toHaveBeenCalledWith(true);

    act(() => {
      fireEvent.click(button);
    });
    expect(setIsExpanded).toHaveBeenCalledTimes(3);
    expect(setIsExpanded).toHaveBeenCalledWith(false);
  });

  it("Should call seeMoreButtonClickCallback based on seeMoreButtonClickCallbackArgumentIsExpanded", () => {
    const seeMoreButtonClickCallback = jest.fn();

    // Test when seeMoreButtonClickCallbackArgumentIsExpanded is true
    render(
      <DefaultSeeMoreButton
        setIsExpanded={() => {}}
        seeMoreButtonClickCallbackArgumentIsExpanded
        seeMoreButtonClickCallback={seeMoreButtonClickCallback}
      />
    );
    const button = screen.getByRole("button");

    act(() => {
      fireEvent.click(button);
    });

    expect(seeMoreButtonClickCallback).toHaveBeenCalledWith(true);

    // Test when seeMoreButtonClickCallbackArgumentIsExpanded is false
    render(
      <DefaultSeeMoreButton
        setIsExpanded={() => {}}
        seeMoreButtonClickCallbackArgumentIsExpanded={false}
        seeMoreButtonClickCallback={seeMoreButtonClickCallback}
      />
    );

    act(() => {
      fireEvent.click(button);
    });
    expect(seeMoreButtonClickCallback).toHaveBeenCalledTimes(2);
  });

  it("Should display the correct icon and text when clicking the button", async () => {
    render(<DefaultSeeMoreButton setIsExpanded={() => {}} />);
    let expandIcon = screen.queryByTestId("expand-icon");
    let collapseIcon = screen.queryByTestId("collapse-icon");

    expect(expandIcon).not.toBeNull();
    expect(collapseIcon).toBeNull();

    let buttonText = screen.queryByText(defaultSeeMoreText(false));
    expect(buttonText).not.toBeNull();

    act(() => {
      userEvent.click(screen.getByRole("button"));
    });

    await waitFor(() => {
      expandIcon = screen.queryByTestId("expand-icon");
      collapseIcon = screen.queryByTestId("collapse-icon");

      expect(expandIcon).toBeNull();
      expect(collapseIcon).not.toBeNull();

      buttonText = screen.queryByText(defaultSeeMoreText(true));
      expect(buttonText).not.toBeNull();
    });

    cleanup();

    //Lets check the text when passing a custom showMoreText
    render(
      <DefaultSeeMoreButton
        setIsExpanded={() => {}}
        showMoreText={showMoreText}
      />
    );

    buttonText = screen.queryByText(showMoreText(false));
    expect(buttonText).not.toBeNull();

    act(() => {
      userEvent.click(screen.getByRole("button"));
    });

    await waitFor(() => {
      buttonText = screen.queryByText(showMoreText(true));
      expect(buttonText).not.toBeNull();
    });
  });
});
