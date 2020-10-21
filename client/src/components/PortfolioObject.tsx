import React, { useEffect } from 'react';
import { useState } from 'react';

import SocialLinks from './SocialLinks';
import PortfolioHero from './PortfolioHero';

import './PortfolioObject.css';
import Emoji from './Emoji';
import AuthorBadge from './AuthorBadge';
// import { useAuth0 } from '@auth0/auth0-react';
import TextInput from './TextInput';
import { useRef } from 'react';
import { DatePicker, Dropdown, Select, Tooltip } from 'antd';
import moment from 'moment';
import {
  CalendarOutlined,
  EyeOutlined,
  LineOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { Option } = Select;

type PortfolioObjectData = {
  id: string;
  title: string;
  type: string;
  media: { type: string; url: string }[];
  date: string;
  author: string;
  shortDescription: string;
  tags?: string[];
  views: string;
  link: string;
  location: string;
};

type PortfolioObjectProps = {
  data: PortfolioObjectData;
  portfolioObjectOpen: any;
  setData: (d: PortfolioObjectData) => void;
  delData: (id: string) => void;
};

function PortfolioObject(props: PortfolioObjectProps) {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  const containerPrimaryRef = useRef<any>(null);

  const isMyProfile = true;

  const [thumbnail, setThumbnail] = useState(true);

  const handleClick = () => {
    setThumbnail(!thumbnail);
    props.portfolioObjectOpen(thumbnail);
    if (containerPrimaryRef.current !== null) {
      containerPrimaryRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (containerPrimaryRef.current !== null) {
      containerPrimaryRef.current.scrollTop = 0;
    }
  }, []);

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

  return (
    <div
      ref={containerPrimaryRef}
      className={`container-primary portfolio-object ${
        thumbnail ? 'thumbnail' : 'container-scroll'
      }`}
    >
      {isMyProfile ? (
        <Tooltip title="Delete This Portfolio Entry" placement="right">
          <div
            onClick={() => {
              props.delData(props.data.id);
            }}
            className="del-button"
          ></div>
        </Tooltip>
      ) : (
        <></>
      )}

      <div onClick={handleClick} className="exit-button"></div>

      <div className="portfolio-title">
        <h2 style={{ marginRight: '35px', marginLeft: '85px' }}>
          <TextInput
            padding="2px 85px 2px 35px"
            editable={isMyProfile}
            onChange={(newString: string) => {
              const newData = { ...props.data };
              newData.title = newString;
              props.setData(newData);
            }}
            text={props.data.title}
          />
        </h2>
      </div>

      <PortfolioHero
        isOpen={!thumbnail}
        isMyProfile={isMyProfile}
        media={props.data.media}
      />
      <div className="portfolio-object-overlay">
        <div className="portfolio-meta">
          <h4>
            <strong>{props.data.title}</strong>
          </h4>
          <h5>{props.data.author}</h5>
        </div>
      </div>
      <div className="portfolio-object-body">
        <div>
          <AuthorBadge author={props.data.author} tagline="Author Tagline" />
          <br />
          <div style={{ marginLeft: '-10px', marginTop: '-10px' }}>
            <TextInput
              padding="10px"
              multiline={true}
              editable={isMyProfile}
              onChange={(newString: string) => {
                const newData = { ...props.data };
                newData.shortDescription = newString;
                props.setData(newData);
              }}
              text={props.data.shortDescription}
            />
          </div>
        </div>
        <div className="container-secondary portfolio-side-bar">
          <ul>
            <li>
              {isMyProfile ? (
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(value) => {
                    const newData = { ...props.data };
                    newData.type = value;
                    props.setData(newData);
                  }}
                  value={props.data.type}
                  filterOption={true}
                >
                  <Option value="App">App</Option>
                  <Option value="Website">Website</Option>
                </Select>
              ) : (
                <div
                  style={{ width: '100%', textAlign: 'center' }}
                  className="portfolio-tag"
                >
                  {props.data.type}
                </div>
              )}
            </li>
            <li>
              {isMyProfile ? (
                <Select
                  mode="tags"
                  style={{ display: 'inline-block', width: '100%' }}
                  placeholder="Tags"
                  onChange={(value) => {
                    // console.log(value);
                    const newData = { ...props.data };
                    newData.tags = value;
                    props.setData(newData);
                  }}
                  value={props.data.tags}
                ></Select>
              ) : props.data.tags ? (
                <div style={{ display: 'inline-block', width: '100%' }}>
                  {props.data.tags.map((value, index) => {
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
              <CalendarOutlined />{' '}
              {isMyProfile ? (
                <DatePicker
                  value={moment(props.data.date, 'YYYY-MM')}
                  placeholder={'Select Date'}
                  bordered={false}
                  picker="month"
                  suffixIcon={<></>}
                  onChange={(date, dateString) => {
                    const newData = { ...props.data };
                    newData.date = dateString;
                    props.setData(newData);
                  }}
                />
              ) : (
                props.data.date
              )}
            </li>
            {/* <li>
              <Emoji symbol="🌏" label="Location:" /> {props.location}
            </li> */}
            <li>
              <LinkOutlined />{' '}
              {isMyProfile ? (
                <div style={{ display: 'inline-block', width: '145px' }}>
                  <TextInput
                    editable={isMyProfile}
                    text={props.data.link}
                    onChange={(newString: string) => {
                      const newData = { ...props.data };
                      newData.link = newString;
                      props.setData(newData);
                    }}
                  />
                </div>
              ) : (
                <a target="_blank" href={props.data.link}>
                  {formatLink(props.data.link)}
                </a>
              )}
            </li>
            <li>
              <EyeOutlined /> {props.data.views}
            </li>
          </ul>
          <div style={{ textAlign: 'center' }}></div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioObject;
