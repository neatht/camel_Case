import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PortfolioObject from './PortfolioObject';

export default {
  title: 'General/Portfolio Object',
  component: PortfolioObject,
} as Meta;

const Template: Story<any> = (args) => <PortfolioObject {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  title: 'Project 1',
  type: 'website',
  picture: 'https://i.ibb.co/BNZxQ2z/example0.jpg',
  date: '2020-01',
  author: 'Author 1',
  shortDescription: 'This is a short description about the project',
  views: '10',
  location: 'Melbourne, Australia',
};
