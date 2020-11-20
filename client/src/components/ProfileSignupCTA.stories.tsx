import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import ProfileSignupCTA from './ProfileSignupCTA';

export default {
  title: 'Profile/Profile Signup CTA',
  component: ProfileSignupCTA,
} as Meta;

const Template: Story<any> = (args) => <ProfileSignupCTA {...args} />;

export const Default = Template.bind({});
Default.args = {};
