import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Uploader from './Uploader';

export default {
  title: 'General/Uploader',
  component: Uploader,
} as Meta;

const Template: Story<any> = (args) => <Uploader {...args} />;

export const Default = Template.bind({});
Default.args = {
  onUpload: () => {},
};
