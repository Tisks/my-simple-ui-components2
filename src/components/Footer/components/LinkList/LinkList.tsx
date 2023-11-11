import React from "react";
import { LinkListArgs } from ".";
import { TextLink } from "../TextLink";
import styles from "./linkList.module.scss";
import classnames from "classnames";
const LinkList = ({
  columnInfo,
  content_group,
  classNames,
  onClick,
  LinkWrapper,
}: LinkListArgs): JSX.Element[] =>
  columnInfo.map((props, index) => {
    return (
      <li
        key={props.text || props.href || index}
        className={classnames(
          styles["link-list__list__item"],
          classNames?.["link-list__list__item"]
        )}
      >
        <TextLink
          {...props}
          onClick={onClick}
          content_group={content_group}
          classNames={{
            "text-link__link": classNames?.["link-list__list__item__link"],
            "text-link__text": classNames?.["link-list__list__item__text"],
          }}
          LinkWrapper={LinkWrapper}
        />
      </li>
    );
  });

export default LinkList;
