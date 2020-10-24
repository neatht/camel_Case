import React, { useState, useEffect } from 'react';

import PortfolioObject from './PortfolioObject';

import './PortfolioGrid.css';
import { Tooltip } from 'antd';

type PortfolioGridProps = {
  userID?: string;
};

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

function PortfolioGrid(props: PortfolioGridProps) {
  const [data, setData] = useState<Array<PortfolioObjectData>>([]);
  //const [fetchError, setFetchError] = useState(false);
  const isMyProfile = !props.userID ? true : false;

  // EDIT ME
  async function fetchData(): Promise<void> {
    //TODO: update with route once implemented on backend
    //const res = await fetch ('/api/v/1/...')
    //res
    //  .json()
    //  .then(res => setPortfolioObjects(res.data))
    //  .catch(err => setFetchError(err));

    // Dummy for now
    setData([
      {
        id: '1',
        title: 'Project 1',
        type: 'website',
        tags: ['one', 'two', 'three', 'four', 'five'],
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 1',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link:
          'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
      },
      {
        id: '2',
        title: 'Project 2',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 2',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link:
          'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
      },
      {
        id: '3',
        title: 'Project 3',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 3',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        id: '4',
        title: 'Project 4',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 4',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        id: '5',
        title: 'Project 5',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/CsNzYxy/example5.png' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 5',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        id: '6',
        title: 'Project 6',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/gWDkgdh/example6.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 6',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        id: '7',
        title: 'Project 7',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/8j5MMLw/example7.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 7',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        id: '8',
        title: 'Project 8',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/rybJT5c/example4.png' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 8',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
      {
        id: '9',
        title: 'Project 9',
        type: 'website',
        // media: [
        //   { type: 'image', url: 'https://i.ibb.co/SBWrhmP/example30.png' },
        //   { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        //   { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        //   { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        //   { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        //   {
        //     type: 'pdf',
        //     url:
        //       'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        //   },
        //   {
        //     type: 'video',
        //     url:
        //       'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        //   },
        // ],
        date: '2020-01',
        author: 'Author 9',
        shortDescription: 'This is a short description about the project',
        views: '10',
        location: 'Melbourne, Australia',
        link: 'https://www.w3.org/',
      },
    ]);
  }

  // EDIT ME
  async function saveData(): Promise<void> {
    // PUT data
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

  const openPortfolioObject = (open: boolean) => {
    setPortfolioObjectOpen(open);
  };

  return (
    <div className={`${portfolioObjectOpen ? 'portfolio-object-open' : ''}`}>
      {isMyProfile ? (
        <Tooltip title="Add New Portfolio Entry" placement="left">
          <div
            className="portfolio-grid-add"
            onClick={() => {
              const newData = [...data];

              // Place Holder
              const d = {
                id: 'id',
                title: 'Project Title',
                type: 'Website',
                // media: { type: string; url: string }[];
                date: '',
                author: 'string',
                shortDescription: 'Short Description.',
                views: '0',
                link: 'Link to project',
                location: 'string',
                new: true,
              };
              newData.push(d);
              setData(newData);
              saveData();
            }}
          >
            +
          </div>
        </Tooltip>
      ) : (
        <></>
      )}
      <div className="grid">
        {data.map((value, index) => {
          return (
            <PortfolioObject
              data={value}
              isMyProfile={isMyProfile}
              // EDIT ME
              setData={(d: PortfolioObjectData) => {
                if (data.length >= index && data[index].id === d.id) {
                  const newData = [...data];
                  newData[index] = d;
                  setData(newData);
                  saveData();
                } else {
                  console.error('PortfolioObject ID Mismatch');
                }
              }}
              delData={(id: string) => {
                if (data.length >= index && data[index].id === id) {
                  const newData = [...data];
                  newData.splice(index, 1);
                  setData(newData);
                  //POST
                } else {
                  console.error('PortfolioObject ID Mismatch');
                }
              }}
              portfolioObjectOpen={openPortfolioObject}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PortfolioGrid;
