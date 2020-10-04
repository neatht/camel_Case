
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import LoginButton from './LoginButton';

export default {
  title: 'General/Login Button',
  component: LoginButton,
} as Meta;

const Template: Story<any> = (args) => <LoginButton {...args} />;

export const Default = Template.bind({});
Default.args = {};