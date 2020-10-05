import React from 'react';
import { shallow } from 'enzyme';
import CompanyAutoComplete from './CompanyAutoComplete';

describe('Testing CompanyAutoComplete', () => {

  it('renders without crashing', () => {
    const component = shallow(<CompanyAutoComplete />);
    expect(component).toMatchSnapshot();
    component.unmount();
  });
    
})
