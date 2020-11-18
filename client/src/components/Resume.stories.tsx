import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import '../css/base.css';
import '../css/layout.css';
import '../css/theme.css';

import Resume from './Resume';

export default {
  title: 'Profile/Resume',
  component: Resume,
} as Meta;

const Template: Story<any> = (args) => <Resume {...args} />;

export const Default = Template.bind({});
Default.args = {
  userID: '5f954a93aeac5f006f9750c2',
};
