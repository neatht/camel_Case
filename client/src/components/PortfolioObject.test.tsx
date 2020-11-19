import React from 'react';
import { shallow } from 'enzyme';
import PortfolioObject from './PortfolioObject';
type PortfolioObjectData = {
  projectID?: string;
  tags?: string[];
  views?: number;
  datePosted?: string;
  location?: string;
  projectName?: string;
  link?: string;
  userID?: string;
  projectType?: string;
};

describe('Testing PortfolioObject', () => {
  /* TODO: update when API is linked */

  it('renders without crashing', () => {
    const component = shallow(
      <PortfolioObject
        new={false}
        data={{
          projectID: '1',
          projectName: 'Project 1',
          projectType: 'website',
          tags: ['one', 'two', 'three', 'four', 'five'],
          datePosted: '2020-01',
          // author: 'Author 1',
          // : 'This is a short description about the project',
          views: 10,

          userID: '10',
          location: 'Melbourne, Australia',
          link:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        }}
        isMyProfile={false}
        // EDIT ME
        setData={(dd: PortfolioObjectData) => {}}
        delData={(dd: PortfolioObjectData) => {}}
        portfolioObjectOpen={false}
      />
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
