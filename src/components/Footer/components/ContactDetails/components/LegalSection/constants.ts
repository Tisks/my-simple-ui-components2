import { ColumnProps, TextLinks } from "../../..";
import { Routes } from "../../../Column/utils";

export const content_group = "legal section";

export const columnInfo: TextLinks = [
  {
    text: `© ${new Date().getFullYear()} Wheel the World, Inc. All rights reserved`,
  },
  {
    href: "https://www.google.com/maps/place/Wheel+the+World/@37.7866328,-122.4047772,17z/data=[…]m2!3d37.7866328!4d-122.4022023!16s%2Fg%2F11s18hbzdd?entry=ttu",
    text: "95 3rd St, San Francisco, CA, USA",
    target: "_blank",
    doInjectPrefixBaseUrl: false,
  },
  { href: Routes.TERMS, text: "Terms of Service" },
  { href: Routes.PRIVACY_POLICY, text: "Privacy policy" },
];

export const legalSectionColumnData: ColumnProps = {
  columnInfo,
  content_group,
  baseUrl: Routes.WEBSITE_DEV,
};
