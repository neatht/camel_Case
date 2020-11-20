import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Testing Loading', () => {
  it('renders loading without crashing', () => {
    const component = shallow(<Loading />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
