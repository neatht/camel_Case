import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PrivateProfileWarning from './PrivateProfileWarning';

export default {
  title: 'Profile/Private Profile Warning',
  component: PrivateProfileWarning,
} as Meta;

const Template: Story<any> = (args) => <PrivateProfileWarning {...args} />;

export const Default = Template.bind({});
Default.args = {};
