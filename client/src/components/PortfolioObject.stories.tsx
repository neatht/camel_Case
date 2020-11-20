import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PortfolioObject from './PortfolioObject';

export default {
  title: 'Portfolio/Portfolio Object',
  component: PortfolioObject,
} as Meta;

const Template: Story<any> = (args) => <PortfolioObject {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    projectID: 53,
    tags: ['React', 'TypeScript'],
    views: 10,
    datePosted: '2020-11-01',
    location: 'Helps you find the perfect dog! 🐶',
    projectName: 'Breed App',
    link: '',
    userID: '5f954a93aeac5f006f9750c2',
    projectType: 'website',
  },
  portfolioObjectOpen: () => {},
  isMyProfile: false,
  new: false,
  setData: undefined,
  delData: undefined,
};
