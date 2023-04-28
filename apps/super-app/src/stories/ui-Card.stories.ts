import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '@acme/ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  title: '@Acme/UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    // title: 'string',
    // cta: 'string',
    // href: 'string',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    title: 'Card title',
    cta: 'Card cta',
    href: 'https://acme.com'
  },
};
