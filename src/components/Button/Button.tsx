import React from "react";
import styles from "./button.module.scss";
import { ButtonProps } from "./types";

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
  const mode = primary
    ? styles["storybook-button--primary"]
    : styles["storybook-button--secondary"];
  const buttonClassName = `${styles["storybook-button"]} ${
    styles["storybook-button--" + size]
  } ${mode}`;
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
