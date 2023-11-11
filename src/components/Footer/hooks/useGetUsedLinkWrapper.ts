import { TLinkWrapper } from "../components/TextLink";
import { useFooterContext } from "./useFooterContext";

export const useGetUsedLinkWrapper = (
  enableSubPathsOnly?: boolean,
  LinkWrapper?: TLinkWrapper
) => {
  const { LinkWrapper: OverallLinkWrapper } = useFooterContext();

  return determineUsedLinkWrapperProps(
    enableSubPathsOnly,
    OverallLinkWrapper,
    LinkWrapper
  );
};

export const determineUsedLinkWrapperProps = (
  enableSubPathsOnly?: boolean,
  OverallLinkWrapper?: TLinkWrapper,
  LinkWrapper?: TLinkWrapper
) => {
  const usedLinkWrapper = OverallLinkWrapper || LinkWrapper; //Prefer the LinkWrapper passed in the parent, otherwise the wrapper that is in the column

  const usedEnableSubPathsOnly =
    typeof enableSubPathsOnly !== "undefined" //If you pass a LinkWrapper from the parent but you need to overwrite one specific column, you can do it here
      ? enableSubPathsOnly
      : usedLinkWrapper?.enableSubPathsOnly;

  return { usedLinkWrapper, enableSubPathsOnly: usedEnableSubPathsOnly };
};
