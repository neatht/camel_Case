import React from 'react';
import { shallow } from 'enzyme';
import NoResultsWarning from './NoResultsWarning';

describe('Testing NoResultsWarning', () => {
  it('renders without crashing', () => {
    const component = shallow(<NoResultsWarning />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
