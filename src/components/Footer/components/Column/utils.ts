export enum Routes {
  DESTINATIONS = "/destinations",
  HOTELS = "/hotels",
  ABOUT_US = "/about-us",
  BLOG = "https://blog.wheeltheworld.com",
  WEBSITE_DEV = "https://dev.wheeltheworld.com",
  AFFILIATE_PROGRAM = "/affiliate-program",
  GROUP_TOURS = "/travel-group-tours",
  CONTACT = "/contact",
  TERMS = '/terms-and-conditions',
  PRIVACY_POLICY = '/privacy-policy',
}

export function getCountryRoute(country: string) {
  return `${Routes.DESTINATIONS}/${country}`;
}

export function getDestinationRoute(country: string, destination: string) {
  return `${getCountryRoute(country)}/${destination}`;
}

export function getDestinationPlaceToStayRoute(
  country: string,
  destination: string
) {
  return `${getDestinationRoute(country, destination)}${Routes.HOTELS}`;
}
