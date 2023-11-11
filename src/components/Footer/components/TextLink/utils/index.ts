import { TextLinks } from "..";

export const addPrefixUrl = (
  columnInfo: TextLinks,
  enableSubPathsOnly?: boolean,
  baseUrl?: string
): TextLinks => {
  if (!baseUrl) return columnInfo;

  return columnInfo.map(({ href, doInjectPrefixBaseUrl = true, ...rest }) => {
    return {
      href: href
        ? `${doInjectPrefixBaseUrl && !enableSubPathsOnly ? baseUrl : ""}${href}`
        : undefined,
      ...rest,
    };
  });
};
