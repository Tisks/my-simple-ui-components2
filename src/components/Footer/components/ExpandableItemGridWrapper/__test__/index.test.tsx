import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  ExpandableItemGridWrapper,
  ItemGrid,
} from "../ExpandableItemGridWrapper";
import fireEvent from "@testing-library/user-event";
import { generateChildrenArray } from "../../../../shared/layouts/ExpandableItemGrid/__test__/index.test";

describe("<ExpandableItemGridWrapper />", () => {
  describe("<ExpandableItemGridWrapper />", () => {
    const content_group = "topic";
    const trackExpandableComponentFn = jest.fn();

    it("Should render the component and when clicking the seeMoreButton it should call the trackExpandableComponent with the content_group and if the grid item was expanded (true) or collapsed (false)", async () => {
      render(
        <ExpandableItemGridWrapper
          childrenArray={generateChildrenArray()}
          content_group={content_group}
          seeMoreButtonClickCallback={trackExpandableComponentFn}
          itemsOnSightLimit={5}
        />
      );

      const seeMoreButton = screen.getByRole("button");

      fireEvent.click(seeMoreButton);

      await waitFor(() => {
        expect(trackExpandableComponentFn).toHaveBeenCalledWith(
          true,
          content_group
        );
      });

      fireEvent.click(seeMoreButton);

      await waitFor(() => {
        expect(trackExpandableComponentFn).toHaveBeenCalledWith(
          false,
          content_group
        );
      });
    });
  });

  describe("<ItemGrid />", () => {
    it("Should render the ExpandableItemGridWrapper without a seeMoreButton so its just a grid of list items", () => {
      render(<ItemGrid childrenArray={generateChildrenArray()} />);

      const seeMoreButton = screen.queryByRole("button");
      expect(seeMoreButton).toBeNull();
    });
  });
});
