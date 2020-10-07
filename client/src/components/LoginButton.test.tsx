import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginButton from './LoginButton';

describe('Testing LoginButton', () => {

  it('renders without crashing', () => {
    const component = shallow(<LoginButton />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('shows login when not authenticated', () => {
    const component = mount(<LoginButton />);

    component.find({ children: 'Login' });
    expect(component).toMatchSnapshot();
    
    component.unmount();
  });

})

