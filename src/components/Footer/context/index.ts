import { createContext } from "react";
import { TFooterContext } from "./types";

const defaultValue: TFooterContext = {
  backgroundColorVariant: "standard",
};

export const FooterContext = createContext<TFooterContext>(defaultValue);
