import React from 'react';
import { shallow } from 'enzyme';
import PortfolioObject from './PortfolioObject';

describe('Testing PortfolioObject', () => {

  /* TODO: update when API is linked */
  
  it('renders without crashing', () => {
    const component = shallow(
      <PortfolioObject
        id="1"
        title="Project 1"
        type="website"
        picture="https://i.ibb.co/BNZxQ2z/example0.jpg"
        date="2020-01"
        author="Author 1"
        shortDescription="This is a short description about the project"
        views="10"
        location="Melbourne, Australia"
        media=""
        portfolioObjectOpen={false}    
      />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
    
})
