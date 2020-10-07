import React from 'react';
import { shallow } from 'enzyme';
import PortfolioGridHeader from './PortfolioGridHeader';

describe('Testing PortfolioGridHeader', () => {
  it('renders without crashing', () => {
    const component = shallow(<PortfolioGridHeader title="Title" />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
