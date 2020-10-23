import React from 'react';
import { shallow } from 'enzyme';
import PortfolioObject from './PortfolioObject';
type PortfolioObjectData = {
  id: string;
  title: string;
  type: string;
  // media: { type: string; url: string }[];
  date: string;
  author: string;
  shortDescription: string;
  tags?: string[];
  views: string;
  link: string;
  location: string;
  new?: boolean;
};

describe('Testing PortfolioObject', () => {
  /* TODO: update when API is linked */

  it('renders without crashing', () => {
    const component = shallow(
      <PortfolioObject
        data={{
          id: '1',
          title: 'Project 1',
          type: 'website',
          tags: ['one', 'two', 'three', 'four', 'five'],
          date: '2020-01',
          author: 'Author 1',
          shortDescription: 'This is a short description about the project',
          views: '10',
          location: 'Melbourne, Australia',
          link:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        }}
        isMyProfile={false}
        // EDIT ME
        setData={(d: PortfolioObjectData) => {}}
        delData={(id: string) => {}}
        portfolioObjectOpen={false}
      />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
