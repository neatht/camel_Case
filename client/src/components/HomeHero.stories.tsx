import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import HomeHero from './HomeHero';

export default {
  title: 'General/Home Hero',
  component: HomeHero,
} as Meta;

const Template: Story<any> = (args) => <HomeHero {...args} />;

export const Default = Template.bind({});
Default.args = {};
