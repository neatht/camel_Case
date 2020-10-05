import React from 'react';
import { shallow } from 'enzyme';
import SocialLinks from './SocialLinks';

describe('Testing SocialLinks', () => {

  it('renders without crashing', () => {
    const component = shallow(<SocialLinks />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
    
})
