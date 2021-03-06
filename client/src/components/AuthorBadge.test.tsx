import React from 'react';
import { shallow } from 'enzyme';
import AuthorBadge from './AuthorBadge';

describe('Testing AuthorBadge', () => {
  it('renders without crashing', () => {
    const component = shallow(
      <AuthorBadge author="author" tagline="tagline" userID={'123'} />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
