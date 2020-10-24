import React, { useEffect, useState } from 'react';

import { Popover, Space, Spin, Tooltip } from 'antd';
import {
  BehanceCircleFilled,
  TwitterCircleFilled,
  GithubFilled,
  DribbbleCircleFilled,
  LinkedinFilled,
  FacebookFilled,
  InstagramFilled,
  GlobalOutlined,
  LineOutlined,
  EditOutlined,
  //MessageFilled,
} from '@ant-design/icons';

import './SocialLinks.css';
import { string } from 'prop-types';
import TextInput from './TextInput';

const SOCIAL_LINK_ICON: { [socialType: string]: JSX.Element } = {
  //phoneNumber: <Space />,
  // emailAddress: <MessageFilled />,
  'github.com': <GithubFilled />,
  'twitter.com': <TwitterCircleFilled />,
  'behance.com': <BehanceCircleFilled />,
  'dribbble.com': <DribbbleCircleFilled />,
  'linkedin.com': <LinkedinFilled />,
  'facebook.com': <FacebookFilled />,
  'instagram.com': <InstagramFilled />,
};

type SocialLinksData = {
  entries: string[];
};

type SocialLinksProps = {
  userID?: string;
  isMyProfile: boolean;
};

function SocialLinks(props: SocialLinksProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<SocialLinksData>();

  // EDIT ME
  async function fetchData(): Promise<void> {
    setData({
      entries: [
        //"phoneNumber": '0492837116',
        // "emailAddress": 'mailto:email@example.com',
        'https://www.github.com',
        // 'https://www.twitter.com',
        'https://www.behance.com',
        'https://www.dribbble.com',
        'https://www.linkedin.com',
        // 'https://www.facebook.com',
        // 'https://www.instagram.com',
        // 'https://www.google.com',
      ],
    });
    setIsLoading(false);
  }

  // EDIT ME
  async function saveData(): Promise<void> {}

  const sanitisedLink = (link: string) => {
    return link
      .toLowerCase()
      .replace(/https?:\/\/(www\.)?/, '')
      .replace(/\/.*/, '');
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="socialLinks">
        <Spin />
      </div>
    );
  } else if (data?.entries.length === 0 && !props.isMyProfile) {
    return <></>;
  } else {
    return (
      // <div className="socialLinks">
      <ul className="socialLinks">
        {data?.entries.map((value, index) => {
          if (props.isMyProfile) {
            return (
              <Popover
                content={
                  <div>
                    <Tooltip title="Remove" placement="left">
                      <div
                        className="exit-button exit-button-social-links"
                        onClick={() => {
                          const newData = { ...data };
                          newData.entries.splice(index, 1);
                          setData(newData);
                          saveData();
                        }}
                      ></div>
                    </Tooltip>
                    <TextInput
                      editable={props.isMyProfile}
                      onChange={(newString: string) => {
                        if (data) {
                          const newData = { ...data };
                          newData.entries[index] = newString;
                          setData(newData);
                          saveData();
                        }
                      }}
                      text={value}
                    />
                  </div>
                }
                trigger="click"
              >
                {sanitisedLink(value) in SOCIAL_LINK_ICON ? (
                  <li>{SOCIAL_LINK_ICON[sanitisedLink(value)]}</li>
                ) : value === 'Enter URL' ? (
                  <li>
                    <EditOutlined />
                  </li>
                ) : (
                  <li>
                    <GlobalOutlined />
                  </li>
                )}
              </Popover>
            );
          } else {
            return (
              <Tooltip title={sanitisedLink(value)} placement="bottom">
                <a target="_blank" rel="noopener noreferrer" href={value}>
                  {sanitisedLink(value) in SOCIAL_LINK_ICON ? (
                    <li>{SOCIAL_LINK_ICON[sanitisedLink(value)]}</li>
                  ) : value === 'Enter URL' ? (
                    <></>
                  ) : (
                    <li>
                      <GlobalOutlined />
                    </li>
                  )}
                </a>
              </Tooltip>
            );
          }
        })}
        {props.isMyProfile ? (
          <Tooltip title={'Add Link'} placement="bottom">
            <li
              className="skills-add"
              onClick={() => {
                if (data) {
                  const newData = { ...data };
                  newData.entries.push('Enter URL');
                  setData(newData);
                  saveData();
                }
              }}
            >
              +
            </li>
          </Tooltip>
        ) : (
          <></>
        )}
      </ul>
    );
  }
}

export default SocialLinks;
