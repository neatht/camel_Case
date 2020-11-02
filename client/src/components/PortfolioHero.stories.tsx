import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PortfolioHero from './PortfolioHero';

export default {
  title: 'Portfolio/Portfolio Hero',
  component: PortfolioHero,
} as Meta;

const Template: Story<any> = (args) => <PortfolioHero {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  isMyProfile: false,
  id: '',
};
