// Import necessary dependencies and components
import { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  SingleAccordionItem,
} from "@wheeltheworld/wtw-ui-components";
// Export metadata for the Accordion component

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Accordion",
  component: Accordion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // onClick is the property we want to remove from the UI
    // We can remove it by deleting this line:
    // onClick: {
    //   table: {
    //     disable: true,
    //   },
    // },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

// Create a sample list of accordion items
const items: SingleAccordionItem[] = [
  {
    title: "Accordion Item Title",
    content: (
      <p style={{ paddingInline: "16px" }}>
        This is the content of the accordion item
      </p>
    ),
  },
  {
    title: "Another Accordion Item",
    content: "This is another item with different content",
  },
];
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MultiOpenAccordion: Story = {
  args: {
    items,
    multiOpen: true,
    iconOrientation: "right",
  },
};

export const SingleOpenAccordion: Story = {
  args: {
    items,
    multiOpen: false,
    iconOrientation: "left",
  },
};

export const StandardVariantAccordion: Story = {
  args: {
    items,
    variant: "standard",
  },
};

export const CompactVariantAccordion: Story = {
  args: {
    items,
    variant: "compact",
  },
};
