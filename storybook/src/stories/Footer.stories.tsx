import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "@wheeltheworld/wtw-ui-components";
import { defaultColumnData } from "../../../src/components/Footer/components/Column/constants";

const meta = {
  title: "Example/Footer",
  component: Footer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  argTypes: {
    clickHandlers: { table: { disable: true } },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabletMobile: Story = {
  args: {
    isTabletMobile: true,
    columnData: defaultColumnData,
  },
};

export const Desktop: Story = {
  args: {
    columnData: defaultColumnData,
  },
};

export const Simple: Story = {
  args: {
    renderSimpleFooter: true,
    columnData: defaultColumnData,
  },
};