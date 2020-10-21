import React, { useState, useEffect } from 'react';

import PortfolioObject from './PortfolioObject';

import './PortfolioGrid.css';
import { Tooltip } from 'antd';

// type PortfolioGridProps = {};

type PortfolioObjectMetaType = {
  key: string;
  title: string;
  type: string;
  media: { type: string; url: string }[];
  date: string;
  author: string;
  shortDescription: string;
  views: string;
  link: string;
  location: string;
};

// function PortfolioGrid(props: PortfolioGridProps) {
function PortfolioGrid() {
  const [portfolioObjects, setPortfolioObjects] = useState<
    Array<PortfolioObjectMetaType>
  >([]);
  //const [fetchError, setFetchError] = useState(false);

  async function fetchPortfolioObjects(): Promise<void> {
    //TODO: update with route once implemented on backend
    //const res = await fetch ('/api/v/1/...')
    //res
    //  .json()
    //  .then(res => setPortfolioObjects(res.data))
    //  .catch(err => setFetchError(err));

    // Dummy for now
    setPortfolioObjects([
      {
        key: '1',
        title: 'Project 1',
        type: 'website',
        media: [
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
        ],
        date: '2020-01',
        author: 'Author 1',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link:
          'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
      },
      {
        key: '2',
        title: 'Project 2',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
          { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
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
        ],
        date: '2020-01',
        author: 'Author 2',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link:
          'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
      },
      {
        key: '3',
        title: 'Project 3',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
          { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
          { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
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
        ],
        date: '2020-01',
        author: 'Author 3',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        key: '4',
        title: 'Project 4',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
          { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
          { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
          { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
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
        ],
        date: '2020-01',
        author: 'Author 4',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        key: '5',
        title: 'Project 5',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/CsNzYxy/example5.png' },
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
        ],
        date: '2020-01',
        author: 'Author 5',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        key: '6',
        title: 'Project 6',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/gWDkgdh/example6.jpg' },
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
        ],
        date: '2020-01',
        author: 'Author 6',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        key: '7',
        title: 'Project 7',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/8j5MMLw/example7.jpg' },
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
        ],
        date: '2020-01',
        author: 'Author 7',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        key: '8',
        title: 'Project 8',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/rybJT5c/example4.png' },
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
        ],
        date: '2020-01',
        author: 'Author 8',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        key: '9',
        title: 'Project 9',
        type: 'website',
        media: [
          { type: 'image', url: 'https://i.ibb.co/SBWrhmP/example30.png' },
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
        ],
        date: '2020-01',
        author: 'Author 9',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
    ]);
  }

  useEffect(() => {
    fetchPortfolioObjects();
  }, []);

  const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

  const openPortfolioObject = (open: boolean) => {
    setPortfolioObjectOpen(open);
  };

  return (
    <div className={`${portfolioObjectOpen ? 'portfolio-object-open' : ''}`}>
      <Tooltip title="Add New Portfolio Entry" placement="left">
        <div className="portfolio-grid-add" onClick={() => {}}>
          +
        </div>
      </Tooltip>
      <div className="grid">
        {portfolioObjects.map((value) => {
          return (
            <PortfolioObject
              id={value.key}
              title={value.title}
              type={value.type}
              media={value.media}
              date={value.date}
              author={value.author}
              shortDescription={value.shortDescription}
              views={value.views}
              link={value.link}
              location={value.location}
              portfolioObjectOpen={openPortfolioObject}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PortfolioGrid;
