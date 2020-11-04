import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Loading from './Loading';

export default {
  title: 'General/Loading',
  component: Loading,
} as Meta;

const Template: Story<any> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  messages: ['Loading component'],
  spinners: true,
};
