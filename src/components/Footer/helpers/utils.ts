import { ColumnPropsSections } from "../components";
import { ColumnProps, ColumnPropsArray } from "../components/Column";

export const affectAllKeyword = "all";

export type ColumnPropsByContentGroupKeys = {
  [x: string]: Partial<ColumnProps>;
};

export const isEmptyObject = (obj?: Record<string, any>): boolean => {
  return !!obj && Object.keys(obj).length === 0;
};

export const doAffectAllColumns = (columnPropsEntriesKeys?: string[]): boolean => {
  return !!columnPropsEntriesKeys?.includes(affectAllKeyword);
};

export const convertSectionsToArrays = (
  columnData: ColumnPropsSections
): ColumnPropsArray => {
  return Object.values(columnData);
};

export const getColumnPropsInjectedToEveryColumn = (
  columnPropsEntries: [string, Partial<ColumnProps>][]
): Partial<ColumnProps> | undefined => {
  let propsToInject: Partial<ColumnProps> | undefined = undefined;
  for (const [key, value] of columnPropsEntries) {
    if (key === affectAllKeyword) propsToInject = value;
  }

  return propsToInject;
};

export const getAllColumnPropsRecordsWithColumnProps = (
  columnArrays: ColumnPropsArray,
  columnPropsInjectedInEveryColumn?: Partial<ColumnProps>
): ColumnPropsByContentGroupKeys => {
  const columnObjects: ColumnPropsByContentGroupKeys =
    arrayToObject(columnArrays);

  if (!columnPropsInjectedInEveryColumn) return columnObjects;

  const allColumnKeys = Object.keys(columnObjects);

  return Object.fromEntries(
    allColumnKeys.map((content_group) => [
      content_group,
      columnPropsInjectedInEveryColumn,
    ])
  );
};

const arrayToObject = (columnArrays: ColumnPropsArray) => {
  return Object.fromEntries(
    Object.entries(columnArrays).map(([, value]) => [
      value.content_group || "",
      value,
    ])
  );
};

export const getAffectedColumns = (
  columnArrays: ColumnPropsArray,
  columnPropsAffectedKeys: string[]
): ColumnPropsByContentGroupKeys => {
  if (columnPropsAffectedKeys.length === 0) return {}; //Nothing to modify

  const affectAllColumns = doAffectAllColumns(columnPropsAffectedKeys);

  const columnObjects: ColumnPropsByContentGroupKeys =
    arrayToObject(columnArrays);

  let affectedColumns: ColumnPropsByContentGroupKeys = {};

  if (affectAllColumns) return columnObjects;

  for (const key of columnPropsAffectedKeys) {
    if (columnObjects[key])
      affectedColumns = { ...affectedColumns, [key]: columnObjects[key] };
  }

  return affectedColumns;
};
