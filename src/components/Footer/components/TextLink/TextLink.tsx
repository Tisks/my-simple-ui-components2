import React, { FC } from "react";
import { TextLinkProps } from "./types";
import styles from "./textLink.module.scss";
import classnames from "classnames";

export const defaultTarget = "_self";
const TextLink: FC<TextLinkProps> = ({
  href,
  text,
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
          classNames?.["text-link__text"]
        )}
      >
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
              classNames?.["text-link__link"]
            )}
            target={target}
            onClick={() => {
              if (doOnClickOnLink) {
                doOnClickOnLink(
                  { href, text, target },
                  enableSubPathsOnly,
                  additionalProps
                ) && onClick?.(text, href, content_group);
              } else {
                onClick?.(text, href, content_group);
              }
            }}
          >
            {text}
          </a>
        </LinkWrapperComponent>
      ) : (
        <a
          role="link"
          href={href}
          className={classnames(
            styles["text-link__link"],
            classNames?.["text-link__link"]
          )}
          target={target}
          onClick={() => onClick?.(text, href, content_group)}
        >
          {text}
        </a>
      )}
    </>
  );
};

export default TextLink;
