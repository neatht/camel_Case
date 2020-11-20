import React from 'react';
import { shallow } from 'enzyme';
import PortfolioGridSearch from './PortfolioGridSearch';

describe('Testing PortfolioGridSearch', () => {
  it('renders home without crashing', () => {
    const component = shallow(
      <PortfolioGridSearch
        data={[
          {
            project_id: '58',
            project_name: 'Cards',
            author_first_name: 'Alex',
            author_last_name: 'Shepard',
            user_id: '5f954a93aeac5f006f9750c2',
          },
          {
            project_id: '53',
            project_name: 'Breed App',
            author_first_name: 'Alex',
            author_last_name: 'Shepard',
            user_id: '5f954a93aeac5f006f9750c2',
          },
        ]}
      />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
