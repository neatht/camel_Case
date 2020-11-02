import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Header from './Header';

export default {
  title: 'General/Header',
  component: Header,
} as Meta;

const Template: Story<any> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  pageKey: 'home',
};
