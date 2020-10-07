import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CompanyAutoComplete from './CompanyAutoComplete';

export default {
  title: 'General/Company AutoComplete',
  component: CompanyAutoComplete,
} as Meta;

const Template: Story<any> = (args) => <CompanyAutoComplete {...args} />;

export const Default = Template.bind({});
Default.args = {};
