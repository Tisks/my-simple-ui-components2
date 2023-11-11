export interface DefaultSeeMoreButtonProps {
  showMoreText?: (isExpanded: boolean) => string;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  seeMoreButtonClickCallback?: (...props: any[]) => void;
  seeMoreButtonClickCallbackArgumentIsExpanded?: boolean;
  className?: string;
}
