import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';

describe('Testing TextInput', () => {
  it('renders without crashing', () => {
    const component = shallow(<TextInput onChange={() => {}} />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
