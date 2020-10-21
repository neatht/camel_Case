import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import Emoji from './Emoji';

export default {
  title: 'General/Emoji',
  component: Emoji,
} as Meta;

const Template: Story<any> = (args) => <Emoji {...args} />;

export const Default = Template.bind({});
Default.args = {
  symbol: '🚀',
};
