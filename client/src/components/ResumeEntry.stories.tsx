import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ResumeEntry from './ResumeEntry';

export default {
  title: 'General/Resume Entry',
  component: ResumeEntry,
} as Meta;

const Template: Story<any> = (args) => <ResumeEntry {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'experience',
  display: 'inline',
  isMyProfile: false,
};
