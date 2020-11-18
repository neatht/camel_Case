import React from 'react';
import { shallow } from 'enzyme';
import ProfileSignupCTA from './ProfileSignupCTA';

describe('Testing ProfileSignupCTA', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProfileSignupCTA />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
