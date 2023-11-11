import { ExpandableItemGridProps } from "../../..";

export interface ExpandableItemGridWrapperProps extends ExpandableItemGridProps {
    content_group?: string;
}

export interface ItemGridProps extends Omit<ExpandableItemGridWrapperProps, 'content_group'> {}
