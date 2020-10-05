import React from 'react';
import { shallow } from 'enzyme';
import PortfolioGrid from './PortfolioGrid';

describe('Testing PortfolioGrid', () => {

  it('renders without crashing', () => {
    const component = shallow(<PortfolioGrid />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
    
})
