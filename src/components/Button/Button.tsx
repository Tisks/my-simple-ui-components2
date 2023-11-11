import React from "react";
import { ButtonProps } from "./types";
import classNames from "classnames";
import styles from "./button.module.scss";

/**
 * Primary UI component for user interaction
 */
const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}) => {
  const buttonClassName = classNames(
    styles["storybook-button"],
    styles["storybook-button--" + size],
    {
      [styles["storybook-button--primary"]]: primary,
      [styles["storybook-button--secondary"]]: !primary,
    }
  );

  return (
    <button
      type="button"
      className={buttonClassName}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
