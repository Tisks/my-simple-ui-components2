import InstagramNeutralIcon from "wtw-icons/_icons/InstagramNeutral";
import FacebookNeutralIcon from "wtw-icons/_icons/FacebookNeutral";
import YoutubeNeutralIcon from "wtw-icons/_icons/YoutubeNeutral";
import LinkedinNeutralIcon from "wtw-icons/_icons/LinkedinNeutral";
import TwitterNeutralIcon from "wtw-icons/_icons/TwitterNeutral";
import { ColumnProps, TextLinks } from "../../..";

export const content_group = "social media";
export const socialMediaInfo: TextLinks = [
  {
    text: "instagram",
    icon: InstagramNeutralIcon,
    href: "https://www.instagram.com/wheeltheworld/",
  },
  {
    text: "facebook",
    icon: FacebookNeutralIcon,
    href: "https://www.facebook.com/gowheeltheworld",
  },
  {
    text: "youtube",
    icon: YoutubeNeutralIcon,
    href: "https://www.youtube.com/channel/UCeBJNnAT0ObBTguXdvr5AxA",
  },
  {
    text: "linkedin",
    icon: LinkedinNeutralIcon,
    href: "https://www.linkedin.com/company/wheeltheworld/",
  },
  {
    text: "twitter",
    icon: TwitterNeutralIcon,
    href: "https://twitter.com/wheeltheworld",
  },
];

export const socialMediaIconsColumnData: ColumnProps = {
  columnInfo: socialMediaInfo,
  content_group,
};
