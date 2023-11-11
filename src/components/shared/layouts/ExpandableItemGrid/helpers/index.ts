export const expandableItemGridId = "expandable_item_grid_id";
export const getDataTestId = (dataTestId?: string) =>
  `${expandableItemGridId}${dataTestId ? `_${dataTestId}` : ""}`;
