import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Testing Header', () => {

  it('renders home without crashing', () => {
    const component = shallow(<Header pageKey="home"/>);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
    
  it('renders profile without crashing', () => {
    const component = shallow(<Header pageKey="profile"/>);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
    
})
