import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PortfolioGrid from './PortfolioGrid';

export default {
  title: 'Portfolio/Portfolio Grid',
  component: PortfolioGrid,
} as Meta;

const Template: Story<any> = (args) => <PortfolioGrid {...args} />;

export const Default = Template.bind({});
Default.args = {
  userID: '5f954a93aeac5f006f9750c2',
};
