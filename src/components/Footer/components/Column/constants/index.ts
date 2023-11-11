//This is where we have the default columns of the footer
import Phone from "wtw-icons/_icons/Phone";
import { ColumnProps, ColumnPropsArray } from "..";
import { getDestinationPlaceToStayRoute, Routes } from "../utils";
import { destinations } from "./destinations";
import { swapConsecutivePairs } from "../../../../../utils/swapConsecutivePairs";

export const contact = {
  phone: "+1 (628) 900 7778",
  email: "developers@wheeltheworld.com",
};

export const aboutInfo: ColumnProps = {
  columnInfo: [
    { href: Routes.ABOUT_US, text: "About us" },
    {
      href: Routes.BLOG,
      text: "Blog",
      doInjectPrefixBaseUrl: false,
      target: "_blank",
    },
    { href: Routes.AFFILIATE_PROGRAM, text: "Affiliate" },
    { href: Routes.GROUP_TOURS, text: "Group tours" },
    { href: Routes.CONTACT, text: "Contact" },
    {
      href: `tel:${contact.phone}`,
      text: contact.phone,
      icon: Phone,
      doInjectPrefixBaseUrl: false,
    },
  ],
  content_group: "about",
  title: "about",
  baseUrl: Routes.WEBSITE_DEV,
};

export const destinationInfo: ColumnProps = {
  columnInfo: swapConsecutivePairs(
    destinations.map(({ name: text, slugs, url }) => ({
      text,
      href:
        url || getDestinationPlaceToStayRoute(slugs.country, slugs.destination),
    }))
  ),
  title: "top destinations",
  itemsOnSightLimit: 12,
  content_group: "destinations",
  itemGridColumns: { desktop: 2, tabletMobile: 1 },
  maxWidthGrid: 400,
  baseUrl: Routes.WEBSITE_DEV,
};

export const blogInfo: ColumnProps = {
  columnInfo: [
    {
      text: "Top 10 Wheelchair Accessible Hotels in New York City",
      href: "/wheelchair-accessible-hotels-new-york-city",
      target: "_blank",
    },
    {
      text: "How Wheel the World is Transforming Accessible Accommodation through Tech-powered Solutions",
      href: "/how-wheel-the-world-is-transforming-accessible-accommodation-through-tech-powered-solutions",
      target: "_blank",
    },
    {
      text: "Wheelchair Travel: Single-Aisle Airplanes Set to Have Accessible Restrooms",
      href: "/wheelchair-travel-single-aisle-airplanes-set-to-have-accessible-restrooms",
      target: "_blank",
    },
    {
      text: "ADA Hotel Requirements",
      href: "/ada-hotel-requirements",
      target: "_blank",
    },
    {
      text: "Top 10 Accessible Hotels in Paris for Any Budget",
      href: "/accessible-hotels-the-10-best-accessible-hotels-in-paris-for-any-budget",
      target: "_blank",
    },
    {
      text: "Roll-in Showers: Everything You Need to Know",
      href: "/accessible-hotels-roll-in-showers-at-hotels-everything-you-need-to-know",
      target: "_blank",
    },
    {
      text: "Candid Interview with Cory Lee",
      href: "/accessible-travel-inspiration-candid-interview-with-cory-lee-accessible-travel-blogger",
      target: "_blank",
    },
    {
      text: "Top 5 Wheelchair Friendly Vacations",
      href: "/accessible-experiences-top-5-wheelchair-friendly-vacations",
      target: "_blank",
    },
    {
      text: "10 Essential Tips When Flying as a Power Wheelchair User",
      href: "/10-essential-tips-when-flying-as-a-power-wheelchair-user",
      target: "_blank",
    },
    {
      text: "Options for Wheelchair Accessible Transportation while Traveling",
      href: "/tips-on-using-ground-transportation-in-a-wheelchair",
      target: "_blank",
    },
  ],
  title: "blog",
  itemsOnSightLimit: 5,
  content_group: "blog",
  maxWidthGrid: 250,
  baseUrl: Routes.BLOG,
  enableSubPathsOnly: false,
};

export const pressInfo: ColumnProps = {
  columnInfo: [
    {
      text: "New Mobility",
      href: "https://newmobility.com/alvaro-silberstein-a-better-way-to-wheel-the-world/",
      target: "_blank",
    },
    {
      text: "TechCrunch",
      href: "https://techcrunch.com/2023/03/09/wheel-the-world-travel-disabilities/",
      target: "_blank",
    },
    {
      text: "Travel Pulse",
      href: "https://www.travelpulse.com/news/technology/wheel-the-world-uses-technology-to-break-accessibility-barriers",
      target: "_blank",
    },
    {
      text: "CNN",
      href: "https://edition.cnn.com/travel/article/machu-picchu-wheelchairs-peru/index.html",
      target: "_blank",
    },
    {
      text: "Washington Post",
      href: "https://www.washingtonpost.com/travel/2022/08/24/wheelchair-flying-airlines-disability/",
      target: "_blank",
    },
    {
      text: "Financial Times",
      href: "https://www.ft.com/content/848e3e70-33a1-11ea-a329-0bcf87a328f2",
      target: "_blank",
    },
    {
      text: "Mashable",
      href: "https://mashable.com/article/wheel-the-world-accessible-travel",
      target: "_blank",
    },
    {
      text: "National Geographic",
      href: "https://www.nationalgeographic.co.uk/travel/2019/09/accessible-adventure-how-travel-becoming-more-inclusive",
      target: "_blank",
    },
    {
      text: "The Points Guy",
      href: "https://thepointsguy.com/guide/accessible-tour-companies/",
      target: "_blank",
    },
    {
      text: "Lonely Planet",
      href: "https://www.lonelyplanet.com/news/best-in-travel-2021-diversity",
      target: "_blank",
    },
    {
      text: "SF Chronicle",
      href: "https://www.sfchronicle.com/bayarea/article/Trekking-by-wheelchair-at-the-end-of-the-Earth-10805000.php?t=97064f17c7&cmpid=twitter-premium",
      target: "_blank",
    },
    {
      text: "Conde Nast",
      href: "https://www.cntraveler.com/story/tour-companies-dedicated-to-travelers-with-disabilities",
      target: "_blank",
    },
    {
      text: "AARP",
      href: "https://www.aarp.org/travel/travel-tips/safety/info-2022/accessible-tour-companies.html",
      target: "_blank",
    },
    {
      text: "Travel and Leisure",
      href: "https://www.travelandleisure.com/travel-news/wheel-the-world-accessibility-vacation-packages",
      target: "_blank",
    },
    {
      text: "Adventure Travel News",
      href: "https://www.adventuretravelnews.com/accessibility-in-adventure-travel",
      target: "_blank",
    },
    {
      text: "Cosmopolitan",
      href: "https://www.cosmopolitan.com/lifestyle/a37068812/wheel-the-world-launches-official-website/?utm_source=google&utm_medium=cpc&utm_campaign=arb_ga_cos_md_pmx_us_urlx_18381206852&gclid=CjwKCAjw6eWnBhAKEiwADpnw9kUFqs1eWSIuSq53GjrSld3y3aj8p9SolJd4HZIRTXk5-opGYoPjNBoCnRUQAvD_BwE",
      target: "_blank",
    },
    {
      text: "Expedia",
      href: "https://www.expediagroup.com/investors/news-and-events/financial-releases/news/news-details/2023/Expedia-Group-Announces-New-API-Partnership-With-Wheel-the-World--to-Enhance-Accessible-Booking-Experience-for-Travelers-With-Disabilities/default.aspx",
      target: "_blank",
    },
    {
      text: "Booking",
      href: "https://www.sustainability.booking.com/post/booster-alumni-wheel-the-world?aid=318615;label=New_English_EN_CA:_California_23537603185-dbi_cOw0KR6EbHOuFWHOnwS634117827552:pl:ta:p1:p2:ac:ap:neg:fi:tiaud-297601666035:dsa-55482331735:lp9032078:li:dec:dm:ag23537603185:cmp363161665;ws=&gclid=CjwKCAjw6eWnBhAKEiwADpnw9ubX4WpIK-vnWPBt3nGDyrCQNdpwL4Zl3UNUABe1AY00EHIPKrhE1RoCAvsQAvD_BwE",
      target: "_blank",
    },
    {
      text: "Travel Gate West",
      href: "https://www.travelagewest.com/Travel/Tour-Operators/wheel-the-world-wheelchair-accessible-travel",
      target: "_blank",
    },
    {
      text: "Battleface",
      href: "https://www.battleface.com/blog/wheel-the-world/",
      target: "_blank",
    },
    {
      text: "Phocuswire",
      href: "https://www.phocuswire.com/Wheel-the-World-lands-6m-to-boost-accessibility-in-travel",
      target: "_blank",
    },
    {
      text: "Journeywoman",
      href: "https://directory.journeywoman.com/tour-company/wheel-the-world/",
      target: "_blank",
    },
    {
      text: "Fodors",
      href: "https://www.fodors.com/news/travel-tips/wheel-the-world-is-a-great-travel-site-for-travelers-with-disabilities",
      target: "_blank",
    },
    {
      text: "Whale Bon Magazine",
      href: "https://whalebonemag.com/wheel-the-world/",
      target: "_blank",
    },
    {
      text: "Washington post",
      href: "https://www.washingtonpost.com/travel/2021/12/27/travel-trends-2022-new-years-resolutions/",
      target: "_blank",
    },
    {
      text: "Yahoo",
      href: "https://www.yahoo.com/lifestyle/traveling-with-a-disability-201829365.html",
      target: "_blank",
    },
  ],
  content_group: "press",
  itemsOnSightLimit: 5,
  itemGridColumns: 1,
  title: "press",
};

export const defaultColumnData: ColumnPropsArray = [
  aboutInfo,
  destinationInfo,
  blogInfo,
  pressInfo,
];
