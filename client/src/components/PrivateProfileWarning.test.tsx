import React from 'react';
import { shallow } from 'enzyme';
import PrivateProfileWarning from './PrivateProfileWarning';

describe('Testing PrivateProfileWarning', () => {
  it('renders without crashing', () => {
    const component = shallow(<PrivateProfileWarning />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
