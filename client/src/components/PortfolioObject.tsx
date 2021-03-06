import React, { useEffect } from 'react';
import { useState } from 'react';

import PortfolioHero from './PortfolioHero';

import './PortfolioObject.css';
import TextInput from './TextInput';
import { useRef } from 'react';
import { Select } from 'antd';
import {
  CalendarOutlined,
  LineOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const { Option } = Select;

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

type PortfolioObjectProps = {
  /** Project information to be displayed */
  data: PortfolioObjectData;
  /** Callback function when the project is opened */
  portfolioObjectOpen: any;
  /** Whether or not the user owns the project (editable) */
  isMyProfile: boolean;
  /** Whether the project was just created or not */
  new: boolean;
  /** Callback function when data is changed */
  setData: (d: PortfolioObjectData) => void;
  /** Callback function when data is deleted */
  delData: (d: PortfolioObjectData) => void;
};

function PortfolioObject(props: PortfolioObjectProps) {
  const containerPrimaryRef = useRef<any>(null);

  const [newEntry, setNewEntry] = useState(props.new);

  const [thumbnail, setThumbnail] = useState(true);

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

  useEffect(() => {
    if (props.new) {
      transition();
    }
    if (containerPrimaryRef.current !== null) {
      containerPrimaryRef.current.scrollTop = 0;
    }
    // eslint-disable-next-line
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
      {/* {props.data.projectID} */}
      {props.isMyProfile ? (
        <div
          onClick={() => {
            transition();
            props.delData(props.data);
          }}
          className="del-button"
        ></div>
      ) : (
        <></>
      )}

      <div
        onClick={() => {
          transition();
          setNewEntry(false);
        }}
        className={`${newEntry ? 'save-button' : 'exit-button'}`}
      ></div>

      <div className="portfolio-title">
        <h2 style={{ marginRight: '85px', marginLeft: '85px' }}>
          <TextInput
            padding="2px 85px 2px 85px"
            editable={props.isMyProfile}
            onChange={(newString: string) => {
              const newData = { ...props.data };
              newData.projectName = newString;
              props.setData(newData);
            }}
            text={props.data.projectName}
            placeholder="Title"
          />
        </h2>
      </div>

      <PortfolioHero
        new={props.new}
        projectID={props.data.projectID}
        isOpen={!thumbnail}
        isMyProfile={props.isMyProfile}
        userID={props.data.userID}
      />
      <div className="portfolio-object-overlay">
        <div className="portfolio-meta">
          <h4>
            <strong>{props.data.projectName}</strong>
          </h4>
        </div>
      </div>
      <div className="portfolio-object-body">
        <div>
          <br />
          <div style={{ marginLeft: '-10px', marginTop: '-10px' }}>
            <TextInput
              padding="10px"
              multiline={true}
              editable={props.isMyProfile}
              onChange={(newString: string) => {
                const newData = { ...props.data };
                newData.location = newString;
                props.setData(newData);
              }}
              text={props.data.location}
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
                    newData.projectType = value;
                    props.setData(newData);
                  }}
                  value={props.data.projectType}
                  filterOption={true}
                >
                  <Option value="website">website</Option>
                  <Option value="app">app</Option>
                  <Option value="code">code</Option>
                  <Option value="academic">academic</Option>
                  <Option value="model">model</Option>
                  <Option value="game">game</Option>
                  <Option value="video">video</Option>
                  <Option value="audio">audio</Option>
                  <Option value="presentation">presentation</Option>
                </Select>
              ) : (
                <div
                  style={{ width: '100%', textAlign: 'center' }}
                  className="portfolio-tag"
                >
                  {props.data.projectType}
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
              <CalendarOutlined />

              {' ' + date(props.data.datePosted)}
            </li>
            <li>
              <LinkOutlined />{' '}
              {props.isMyProfile ? (
                <div style={{ display: 'inline-block', width: '145px' }}>
                  <TextInput
                    editable={props.isMyProfile}
                    placeholder={'Link to project'}
                    text={props.data.link}
                    onChange={(newString: string) => {
                      const newData = { ...props.data };
                      newData.link = newString;
                      props.setData(newData);
                    }}
                  />
                </div>
              ) : (
                <a
                  target="_blank"
                  href={props.data.link}
                  rel="noopener noreferrer"
                >
                  {props.data.link ? formatLink(props.data.link) : null}
                </a>
              )}
            </li>
          </ul>
          <div style={{ textAlign: 'center' }}></div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioObject;
