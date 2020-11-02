import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PortfolioGridHeader from './PortfolioGridHeader';
import SocialLinks from './SocialLinks';

export default {
  title: 'Portfolio/Portfolio Grid Header',
  component: PortfolioGridHeader,
} as Meta;

const Template: Story<any> = (args) => <PortfolioGridHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  socialLinks: <SocialLinks isMyProfile={false} />,
};
