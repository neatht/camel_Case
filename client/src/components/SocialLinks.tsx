import React, { useEffect, useState } from 'react';

import { Popover, Spin, Tooltip } from 'antd';
import {
  BehanceCircleFilled,
  TwitterCircleFilled,
  GithubFilled,
  DribbbleCircleFilled,
  LinkedinFilled,
  FacebookFilled,
  InstagramFilled,
  GlobalOutlined,
  EditOutlined,
} from '@ant-design/icons';

import './SocialLinks.css';
import TextInput from './TextInput';
import { useAuth0 } from '@auth0/auth0-react';

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://localhost:5000/api/';

const SOCIAL_LINK_ICON: { [socialType: string]: JSX.Element } = {
  'github.com': <GithubFilled />,
  'twitter.com': <TwitterCircleFilled />,
  'behance.com': <BehanceCircleFilled />,
  'dribbble.com': <DribbbleCircleFilled />,
  'linkedin.com': <LinkedinFilled />,
  'facebook.com': <FacebookFilled />,
  'instagram.com': <InstagramFilled />,
};

type SocialLinksData = string[];

type SocialLinksProps = {
  /** userID to fetch social links from */
  userID?: string;
  /** Whether the links can be edited */
  isMyProfile: boolean;
};

function SocialLinks(props: SocialLinksProps) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  const [links, setLinks] = useState<SocialLinksData>();

  async function fetchData(): Promise<void> {
    //setIsLoading(true);

    // If there is no userID, fetch own profile
    const route = props.isMyProfile ? 'links' : `links/${props.userID}`;

    // Call API
    try {
      const token = isAuthenticated ? await getAccessTokenSilently() : '';
      const res = await fetch(API_URL + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has profile data
      const resBody = await res.json();
      const data =
        'data' in resBody && 'links' in resBody['data']
          ? resBody['data']['links']
          : {};

      console.log('setting data...', { data });
      setLinks(data);

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
    }
  }

  async function saveData(link: string): Promise<void> {
    //setIsLoading(true);

    // If there is no userID, fetch own profile
    const route = props.isMyProfile ? 'links' : `links/${props.userID}`;

    // Call API
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(API_URL + route, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { link: link } }),
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      fetchData();

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

  async function deleteLink(link: string): Promise<void> {
    // If there is no userID, fetch own profile
    const route = props.isMyProfile ? 'links' : `links/${props.userID}`;

    // Call API
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(API_URL + route, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { link: link } }),
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      fetchData();

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
    }
  }

  const sanitisedLink = (link: string) => {
    return link
      .toLowerCase()
      .replace(/https?:\/\/(www\.)?/, '')
      .replace(/\/.*/, '');
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="socialLinks">
        <Spin />
      </div>
    );
  } else if (links?.length === 0 && !props.isMyProfile) {
    return <></>;
  } else {
    return (
      // <div className="socialLinks">
      <ul className="socialLinks">
        {links?.map((value, index) => {
          if (props.isMyProfile) {
            return (
              <Popover
                key={value}
                content={
                  <div>
                    <Tooltip title="Remove" placement="left">
                      <div
                        className="exit-button exit-button-social-links"
                        onClick={() => {
                          if (value === '') {
                            setLinks(links.filter((link) => link !== ''));
                          }
                          deleteLink(value);
                        }}
                      ></div>
                    </Tooltip>
                    <TextInput
                      placeholder="Enter social link"
                      editable={props.isMyProfile}
                      onChange={(newString: string) => {
                        saveData(newString);
                        deleteLink(value);
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
                if (links) {
                  setLinks([...links!, '']);
                } else {
                  setLinks(['']);
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
