import React from 'react';
import { shallow } from 'enzyme';
import FilterAndSort from './FilterAndSort';

describe('Testing FilterAndSort', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <FilterAndSort
        filterCallback={() => {}}
        sortCallback={() => {}}
        clearCallBack={() => {}}
        openCallBack={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
