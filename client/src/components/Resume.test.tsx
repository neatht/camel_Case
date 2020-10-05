import React from 'react';
import { shallow } from 'enzyme';
import Resume from './Resume';

describe('Testing Resume', () => {

  it('renders without crashing', () => {
    const component = shallow(
      <Resume
        name="Jane Doe"
        profile="I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design. "
        student="The University of Melbourne"
        location="Melbourne, Australia"
        work={true}
      />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

})
