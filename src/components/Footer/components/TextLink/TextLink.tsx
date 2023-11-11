import React, { FC } from "react";
import { TextLinkProps } from "./types";
import styles from "./textLink.module.scss";
import classnames from "classnames";

export const defaultTarget = "_self";
const TextLink: FC<TextLinkProps> = ({
  href,
  text,
  icon: Icon,
  target = defaultTarget,
  content_group,
  onClick,
  classNames,
  LinkWrapper,
}) => {
  const {
    component: LinkWrapperComponent,
    additionalProps,
    doOnClickOnLink,
    enableSubPathsOnly,
  } = LinkWrapper || {};

  if (!href && text)
    return (
      <p
        className={classnames(
          styles["text-link__text"],
          classNames?.["text-link__text"],
          {
            [styles["icon--flex-gap"]]: !!Icon,
          }
        )}
      >
        {Icon && (
          <Icon
            data-testid={`${text}-icon`}
            className={styles["text-link__icon"]}
          />
        )}
        {text}
      </p>
    );

  if (!href || !text) return null;

  return (
    <>
      {LinkWrapperComponent ? (
        <LinkWrapperComponent href={href} {...additionalProps}>
          <a
            role="link"
            className={classnames(
              styles["text-link__link"],
              classNames?.["text-link__link"],
              {
                [styles["icon--flex-gap"]]: !!Icon,
              }
            )}
            target={target}
            onClick={() => {
              if (doOnClickOnLink) {
                doOnClickOnLink(
                  { href, icon: Icon, text, target },
                  enableSubPathsOnly,
                  additionalProps
                ) && onClick?.(text, href, content_group);
              } else {
                onClick?.(text, href, content_group);
              }
            }}
          >
            {Icon && (
              <Icon
                data-testid={`${text}-icon`}
                className={styles["text-link__icon"]}
              />
            )}
            {text}
          </a>
        </LinkWrapperComponent>
      ) : (
        <a
          role="link"
          href={href}
          className={classnames(
            styles["text-link__link"],
            classNames?.["text-link__link"],
            {
              [styles["icon--flex-gap"]]: !!Icon,
            }
          )}
          target={target}
          onClick={() => onClick?.(text, href, content_group)}
        >
          {Icon && (
            <Icon
              data-testid={`${text}-icon`}
              className={styles["text-link__icon"]}
            />
          )}
          {text}
        </a>
      )}
    </>
  );
};

export default TextLink;
