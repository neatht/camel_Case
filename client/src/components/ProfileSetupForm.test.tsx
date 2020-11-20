import React from 'react';
import { shallow } from 'enzyme';
import ProfileSetupForm from './ProfileSetupForm';

describe('Testing ProfileSetupForm', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProfileSetupForm />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
