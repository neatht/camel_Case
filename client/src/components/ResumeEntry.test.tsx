import React from 'react';
import { shallow } from 'enzyme';
import ResumeEntry from './ResumeEntry';

describe('Testing ResumeEntry', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <ResumeEntry
        title="Experience"
        display="block"
        entries={[
          {
            date: '2020',
            text: 'Internship at a Company',
            subText: 'as a Full Stack Developer',
          },
          {
            date: '2019',
            text: 'Internship at a different Company',
            subText: 'as a Front end Developer',
          },
          { date: '2018-Current', text: 'Part time job' },
        ]}
      />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
