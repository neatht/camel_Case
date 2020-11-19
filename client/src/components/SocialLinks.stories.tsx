import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SocialLinks from './SocialLinks';

export default {
  title: 'Profile/Social Links',
  component: SocialLinks,
} as Meta;

const Template: Story<any> = (args) => <SocialLinks {...args} />;

export const Default = Template.bind({});
Default.args = {
  userID: '',
  isMyProfile: false,
};
