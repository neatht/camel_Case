import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import NoResultsWarning from './NoResultsWarning';

export default {
  title: 'General/No Results Warning',
  component: NoResultsWarning,
} as Meta;

const Template: Story<any> = (args) => <NoResultsWarning {...args} />;

export const Default = Template.bind({});
Default.args = {};
