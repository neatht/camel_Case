import React from 'react';
import { shallow } from 'enzyme';
import Resume from './Resume';

describe('Testing Resume', () => {
  it('renders without crashing', () => {
    const component = shallow(<Resume userID="string" />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
