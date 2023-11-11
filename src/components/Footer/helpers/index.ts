import {
  ColumnPropsArray,
  ColumnPropsSections,
  ColumnProps,
} from "../components";
import { TextLink } from "../components/TextLink/types";
import {
  getAffectedColumns,
  getAllColumnPropsRecordsWithColumnProps,
  getColumnPropsInjectedToEveryColumn,
  isEmptyObject,
  convertSectionsToArrays,
  doAffectAllColumns,
} from "./utils";

const _injectPropsOnColumnProps = (
  columnPropsArrays: ColumnPropsArray,
  columnPropsByColumnId?: Record<string, Partial<ColumnProps>>,
  columnInfoPropsByColumnId?: Record<string, Partial<TextLink>>
) => {
  const columnPropsEntries = Object.entries(columnPropsByColumnId || {});
  const columnInfoPropsEntries = Object.entries(
    columnInfoPropsByColumnId || {}
  );

  if (!columnPropsEntries?.length && !columnInfoPropsEntries?.length)
    return columnPropsArrays; //Nothing to modify

  const columnPropsEntriesKeys = Object.keys(columnPropsByColumnId || {});
  const columnInfoPropsEntriesKeys = Object.keys(
    columnInfoPropsByColumnId || {}
  );

  let modifiedColumnProps = getAffectedColumns(
    columnPropsArrays,
    columnPropsEntriesKeys
  );
  let modifiedColumnInfoProps = getAffectedColumns(
    columnPropsArrays,
    columnInfoPropsEntriesKeys
  );

  const usedColumnPropsByColumnId = doAffectAllColumns(columnPropsEntriesKeys)
    ? getAllColumnPropsRecordsWithColumnProps(
        columnPropsArrays,
        getColumnPropsInjectedToEveryColumn(columnPropsEntries)
      )
    : columnPropsByColumnId || {};

  const res = columnPropsArrays.map((props) => {
    if (!isEmptyObject(modifiedColumnProps)) {
      return { ...props, ...usedColumnPropsByColumnId[props.content_group!] };
    }
    if (!isEmptyObject(modifiedColumnInfoProps) && columnInfoPropsByColumnId) {
      const appliedTextLinkProps = columnInfoPropsEntries!.find(
        ([key]) => key === props.content_group!
      )?.[1];

      const result = {
        ...props,
        columnInfo: props.columnInfo.map((innerProps) => {
          return {
            ...innerProps,
            ...(appliedTextLinkProps || {}),
          };
        }),
      };

      return result;
    }
    return props;
  });
  return res;
};

export const injectPropsOnColumnProps = (
  columnData: ColumnPropsArray | ColumnPropsSections,
  columnPropsByColumnId?: Record<string, Partial<ColumnProps>>,
  columnInfoPropsByColumnId?: Record<string, Partial<TextLink>>
): ColumnPropsArray | ColumnPropsSections => {
  if (Array.isArray(columnData)) {
    return _injectPropsOnColumnProps(
      columnData,
      columnPropsByColumnId,
      columnInfoPropsByColumnId
    );
  } else {
    const sectionNames = Object.keys(columnData);
    const columnPropsArrays = _injectPropsOnColumnProps(
      convertSectionsToArrays(columnData),
      columnPropsByColumnId,
      columnInfoPropsByColumnId
    );

    const modifiedSections = Object.fromEntries(
      sectionNames.map((name, index) => [name, columnPropsArrays[index]])
    );
    return modifiedSections;
  }
};
