import React, { useEffect, useState } from "react";
import { DefaultSeeMoreButtonProps } from "./types";
import styles from "./defaultSeeMoreButton.module.scss";
import classnames from "classnames";
import { ChevronIcon } from "../../../ChevronIcon";

export const defaultSeeMoreText = (isExpanded: boolean) =>
  `Show${!isExpanded ? " more" : " less"}`;

const DefaultSeeMoreButton: React.FC<DefaultSeeMoreButtonProps> = ({
  setIsExpanded,
  showMoreText,
  seeMoreButtonClickCallback,
  className,
  seeMoreButtonClickCallbackArgumentIsExpanded = true,
}) => {
  const [localIsExpanded, setLocalIsExpanded] = useState<boolean>(false);

  const handleToggle = () => {
    setLocalIsExpanded((expanded) => {
      seeMoreButtonClickCallbackArgumentIsExpanded &&
        seeMoreButtonClickCallback?.(!expanded);
      return !expanded;
    });
    !seeMoreButtonClickCallbackArgumentIsExpanded &&
      seeMoreButtonClickCallback?.();
  };

  useEffect(() => {
    setIsExpanded(localIsExpanded);
  }, [localIsExpanded]);

  const buttonClasses = classnames(
    styles["default-see-more-button"],
    className
  );

  const textClasses = classnames(
    styles["default-see-more-button__text"],
    className
  );

  const iconClasses = classnames(
    styles["default-see-more-button__icon"],
    className
  );
  return (
    <button role="button" className={buttonClasses} onClick={handleToggle}>
      <p className={textClasses}>
        {showMoreText?.(localIsExpanded) || defaultSeeMoreText(localIsExpanded)}
      </p>

      <ChevronIcon
        iconThickness="2"
        className={iconClasses}
        direction={localIsExpanded ? "up" : "down"}
        data-testid={`${localIsExpanded ? "collapse" : "expand"}-icon`}
      />
    </button>
  );
};

DefaultSeeMoreButton.displayName = "DefaultSeeMoreButton";

export default DefaultSeeMoreButton;
