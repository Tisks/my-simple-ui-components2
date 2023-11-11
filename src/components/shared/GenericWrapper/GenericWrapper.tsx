import React from "react";
import { GenericWrapperProps } from ".";

const GenericWrapper: React.FC<GenericWrapperProps<any>> = ({
  component: Component,
  additionalProps,
  ...rest
}) => {
  return <Component {...additionalProps} {...rest} />;
};

export default GenericWrapper;
