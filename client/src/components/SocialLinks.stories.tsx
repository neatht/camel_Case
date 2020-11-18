import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SocialLinks from './SocialLinks';

import '../css/base.css';
import '../css/layout.css';
import '../css/theme.css';

export default {
  title: 'Profile/Social Links',
  component: SocialLinks,
} as Meta;

const Template: Story<any> = (args) => <SocialLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  userID: '5f954a93aeac5f006f9750c2',
  isMyProfile: false,
};
