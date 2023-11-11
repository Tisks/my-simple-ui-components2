import React from "react";

export type GenericWrapperProps<T> = {
  component: React.ComponentType<T>;
  additionalProps?: T;
};