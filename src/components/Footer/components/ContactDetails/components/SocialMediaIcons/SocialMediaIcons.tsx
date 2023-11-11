import React, { FC } from "react";
import { SocialMediaIconsProps } from "./types";
import { content_group } from "./constants";
import styles from "./socialMediaIcons.module.scss";

export const socialMediaId = "social-media";
const SocialMediaIcons: FC<SocialMediaIconsProps> = ({ columnProps }) => {
  const { columnInfo = [], onClick } = columnProps || {};
  return (
    <section
      className={styles["social-media-icons"]}
      data-testid={socialMediaId}
    >
      <ul className={styles["social-media-icons__list"]}>
        {columnInfo.map(({ text, href, target = "_blank" }) => (
          <li
            key={text || href}
            className={styles["social-media-icons__list__item"]}
          >
            <a
              href={href}
              aria-label={text}
              target={target}
              onClick={() =>
                text && href && onClick?.(text, href, content_group)
              }
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SocialMediaIcons;
