import React, { useEffect } from 'react';
import { useState } from 'react';

import PortfolioHeroSearch from './PortfolioHeroSearch';

import './PortfolioObject.css';
import TextInput from './TextInput';
import { useRef } from 'react';
import {
  CalendarOutlined,
  LineOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import Loading from './Loading';
import AuthorBadge from './AuthorBadge';

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://localhost:5000/api/';

type PortfolioObjectSearchData = {
  // routes set in snake_case
  project_id: string;
  project_name: string;
  author_first_name: string;
  author_last_name: string;
  user_id: string;
};

type PortfolioObjectData = {
  projectID: string;
  tags?: string[];
  views?: number;
  datePosted?: string;
  location?: string;
  projectName?: string;
  link?: string;
  userID?: string;
  projectType?: string;
};

type PortfolioObjectProps = {
  data: PortfolioObjectSearchData;
  portfolioObjectOpen: any;
};

function PortfolioObjectSearch(props: PortfolioObjectProps) {
  const containerPrimaryRef = useRef<any>(null);

  const [thumbnail, setThumbnail] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [portfolioData, setPortfolioData] = useState<PortfolioObjectData>();

  const date = (d?: string): string | undefined => {
    const newDate = d?.split('-');
    if (d && newDate?.length === 3) {
      return `${newDate[2].replace(/T.*/, '')}-${newDate[1]}-${newDate[0]}`;
    } else return d;
  };

  const transition = () => {
    setThumbnail(!thumbnail);
    props.portfolioObjectOpen(thumbnail);
    if (containerPrimaryRef.current !== null) {
      containerPrimaryRef.current.scrollTop = 0;
    }
  };

  const formatLink = (link: string) => {
    const l = link.replace(/https?:\/\/(www.)?/, '').replace(/\/$/, '');
    return (
      <div
        style={{
          marginBottom: '-5px',
          display: 'inline-block',
          width: '140px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {l}
      </div>
    );
  };

  async function fetchData(): Promise<void> {
    const route = `project/${props.data.user_id}/${props.data.project_id}`;

    try {
      const res = await fetch(API_URL + route);

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has profile data
      const resBody = await res.json();
      const data = 'data' in resBody ? resBody['data'] : {};

      // Set profile data (empty object if invalid)
      console.log('setting PortfolioData...', { data });

      setPortfolioData(data);
      setIsLoading(false);
    } catch (e) {
      if (setIsLoading) {
        setIsLoading(false);
      }
      const res = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      console.error(res, e);
      //return res;
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading messages={['Loading Project']} />;
  } else {
    return (
      <div
        ref={containerPrimaryRef}
        className={`container-primary portfolio-object ${
          thumbnail ? 'thumbnail' : 'container-scroll'
        }`}
      >
        <div
          onClick={() => {
            transition();
          }}
          className={'exit-button'}
        ></div>

        <div className="portfolio-title">
          <h2 style={{ marginRight: '85px', marginLeft: '85px' }}>
            <TextInput
              padding="2px 85px 2px 85px"
              editable={false}
              onChange={() => {}}
              text={props.data.project_name}
            />
          </h2>
        </div>

        <PortfolioHeroSearch
          new={false}
          projectID={props.data.project_id}
          isOpen={!thumbnail}
          isMyProfile={false}
          userID={props.data.user_id}
        />
        <div className="portfolio-object-overlay">
          <div className="portfolio-meta">
            <h4>
              <strong>{props.data.project_name}</strong>
            </h4>
            <h5>{`${props.data.author_first_name} ${props.data.author_last_name}`}</h5>
          </div>
        </div>
        <AuthorBadge
          author={`${props.data.author_first_name} ${props.data.author_last_name}`}
          userID={props.data.user_id}
        />
        <div className="portfolio-object-body">
          <div>
            <br />
            <div style={{ marginLeft: '-10px', marginTop: '-10px' }}>
              <TextInput
                padding="10px"
                multiline={true}
                editable={false}
                onChange={() => {}}
                text={portfolioData?.location}
                placeholder="Description"
              />
            </div>
          </div>

          <div className="container-secondary portfolio-side-bar">
            <ul>
              <li>
                <div
                  style={{ width: '100%', textAlign: 'center' }}
                  className="portfolio-tag"
                >
                  {portfolioData?.projectType}
                </div>
              </li>
              <li>
                {portfolioData?.tags ? (
                  <div style={{ display: 'inline-block', width: '100%' }}>
                    {portfolioData?.tags.map((value, index) => {
                      return <div className="portfolio-tag">{value}</div>;
                    })}
                  </div>
                ) : (
                  <></>
                )}
              </li>
              <li style={{ textAlign: 'center' }}>
                <LineOutlined />
              </li>
              <li>
                <CalendarOutlined />

                {' ' + date(portfolioData?.datePosted)}
              </li>
              <li>
                <LinkOutlined />{' '}
                <a
                  target="_blank"
                  href={portfolioData?.link}
                  rel="noopener noreferrer"
                >
                  {portfolioData?.link ? formatLink(portfolioData?.link) : null}
                </a>
              </li>
            </ul>
            <div style={{ textAlign: 'center' }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioObjectSearch;
