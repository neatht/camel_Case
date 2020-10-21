import React from 'react';
import { shallow } from 'enzyme';
import PortfolioObject from './PortfolioObject';

describe('Testing PortfolioObject', () => {
  /* TODO: update when API is linked */

  it('renders without crashing', () => {
    const m = [
      { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
      { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
      { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
      { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
      {
        type: 'pdf',
        url:
          'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      {
        type: 'video',
        url:
          'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
      },
    ];
    const component = shallow(
      <PortfolioObject
        id="1"
        title="Project 1"
        type="website"
        // picture="https://i.ibb.co/BNZxQ2z/example0.jpg"
        date="2020-01"
        author="Author 1"
        shortDescription="This is a short description about the project"
        views="10"
        location="Melbourne, Australia"
        media={m}
        link="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"
        portfolioObjectOpen={false}
      />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
