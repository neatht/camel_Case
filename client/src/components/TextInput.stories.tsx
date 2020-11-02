import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TextInput from './TextInput';

export default {
  title: 'General/Text Input',
  component: TextInput,
} as Meta;

const Template: Story<any> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: '',
  placeholder: 'Text',
  padding: '2px',
  radius: '',
  editable: false,
  multiline: true,
  maxLen: 100,
  onChange: () => {},
};
