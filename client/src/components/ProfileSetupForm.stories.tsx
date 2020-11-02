import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ProfileSetupForm from './ProfileSetupForm';

export default {
  title: 'Profile/Profile Setup Form',
  component: ProfileSetupForm,
} as Meta;

const Template: Story<any> = (args) => <ProfileSetupForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
