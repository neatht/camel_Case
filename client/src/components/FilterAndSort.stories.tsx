import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import FilterAndSort from './FilterAndSort';

export default {
  title: 'General/Filter and Sort',
  component: FilterAndSort,
} as Meta;

const Template: Story<any> = (args) => <FilterAndSort {...args} />;

export const Default = Template.bind({});
Default.args = {};
