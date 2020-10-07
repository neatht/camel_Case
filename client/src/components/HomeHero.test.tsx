import React from 'react';
import { shallow, mount } from 'enzyme';
import HomeHero from './HomeHero';

describe('Testing HomeHero', () => {
  it('renders without crashing', () => {
    const component = shallow(<HomeHero />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('hides when closed', () => {
    const component = mount(<HomeHero />);

    component
      .find({ className: 'toggle-home-hero exit-button' })
      .simulate('click');

    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
