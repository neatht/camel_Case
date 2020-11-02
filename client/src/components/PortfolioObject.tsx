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
  date: string;
  author: string;
  shortDescription: string;
  tags?: string[];
  views: string;
  link: string;
  location: string;
  new?: boolean;
};

type PortfolioObjectProps = {
  data: PortfolioObjectData;
  portfolioObjectOpen: any;
  isMyProfile: boolean;
  setData: (d: PortfolioObjectData) => void;
  delData: (id: string) => void;
};

function PortfolioObject(props: PortfolioObjectProps) {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  const containerPrimaryRef = useRef<any>(null);

  const [thumbnail, setThumbnail] = useState(true);

  const transition = () => {
    setThumbnail(!thumbnail);
    props.portfolioObjectOpen(thumbnail);
    if (containerPrimaryRef.current !== null) {
      containerPrimaryRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (props.data.new) {
      transition();
    }
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
      {props.isMyProfile ? (
        <div
          onClick={() => {
            transition();
            props.delData(props.data.id);
          }}
          className="del-button"
        ></div>
      ) : (
        <></>
      )}

      <div
        onClick={() => {
          if (props.data.new) {
            const newData = { ...props.data };
            newData.new = false;
            props.setData(newData);
          }
          transition();
        }}
        className={`${props.data.new ? 'save-button' : 'exit-button'}`}
      ></div>

      <div className="portfolio-title">
        <h2 style={{ marginRight: '85px', marginLeft: '85px' }}>
          <TextInput
            padding="2px 85px 2px 85px"
            editable={props.isMyProfile}
            onChange={(newString: string) => {
              const newData = { ...props.data };
              newData.title = newString;
              props.setData(newData);
            }}
            text={props.data.title}
            placeholder="Title"
          />
        </h2>
      </div>

      <PortfolioHero
        id={props.data.id}
        isOpen={!thumbnail}
        isMyProfile={props.isMyProfile}
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
          <AuthorBadge
            author={props.data.author}
            tagline="Computer Science Student at the University of Melbourne"
          />
          <br />
          <div style={{ marginLeft: '-10px', marginTop: '-10px' }}>
            <TextInput
              padding="10px"
              multiline={true}
              editable={props.isMyProfile}
              onChange={(newString: string) => {
                const newData = { ...props.data };
                newData.shortDescription = newString;
                props.setData(newData);
              }}
              text={props.data.shortDescription}
              placeholder="Description"
            />
          </div>
        </div>
        <div className="container-secondary portfolio-side-bar">
          <ul>
            <li>
              {props.isMyProfile ? (
                <Select
                  style={{ width: '100%' }}
                  placeholder="Project Type"
                  onChange={(value) => {
                    const newData = { ...props.data };
                    newData.type = value;
                    props.setData(newData);
                  }}
                  value={props.data.type}
                >
                  <Option value="app">
                    <Emoji symbol="📱" /> App
                  </Option>
                  <Option value="website">
                    <Emoji symbol="🖥" /> Website
                  </Option>
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
              {props.isMyProfile ? (
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
                >
                  <Option value="React">React</Option>
                  <Option value="TypeScript">TypeScript</Option>
                  <Option value="Express">Express</Option>
                </Select>
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
              {props.isMyProfile ? (
                <DatePicker
                  value={moment(props.data.date, 'MMM YYYY')}
                  placeholder={'Select Date'}
                  bordered={false}
                  picker="month"
                  suffixIcon={<></>}
                  onChange={(date, dateString) => {
                    const newData = { ...props.data };
                    newData.date = dateString;
                    props.setData(newData);
                  }}
                  format={'MMM YYYY'}
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
              {props.isMyProfile ? (
                <div style={{ display: 'inline-block', width: '145px' }}>
                  <TextInput
                    editable={props.isMyProfile}
                    text={props.data.link}
                    placeholder="Link"
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
