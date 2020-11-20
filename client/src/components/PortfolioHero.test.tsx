import React from 'react';
import { shallow } from 'enzyme';
import PortfolioHero from './PortfolioHero';

describe('Testing PortfolioHero', () => {
  it('renders home without crashing', () => {
    const component = shallow(
      <PortfolioHero isOpen={false} isMyProfile={false} new={false} />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
