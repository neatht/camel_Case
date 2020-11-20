import React from 'react';
import { shallow } from 'enzyme';
import ResumeEntry from './ResumeEntry';

describe('Testing ResumeEntry', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <ResumeEntry type="experience" display="block" isMyProfile={true} />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
