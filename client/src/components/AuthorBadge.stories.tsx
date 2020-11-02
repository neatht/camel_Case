import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import AuthorBadge from './AuthorBadge';

export default {
  title: 'Profile/Author Badge',
  component: AuthorBadge,
} as Meta;

const Template: Story<any> = (args) => <AuthorBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  author: 'Alex Shepard',
  tagline: 'Computer Science Student at the Univeristy of Melbourne',
  profilePictureLink: 'https://i.imgur.com/h2E4WGw.jpg',
};
