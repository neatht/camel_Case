import React, { useEffect, useState } from 'react';

import { Space } from 'antd';
import {
  BehanceCircleFilled,
  TwitterCircleFilled,
  GithubFilled,
  DribbbleCircleFilled,
  LinkedinFilled,
  FacebookFilled,
  InstagramFilled,
  //MessageFilled,
} from '@ant-design/icons';

import './SocialLinks.css';

const SOCIAL_LINK_ICON: { [socialType: string]: JSX.Element } = {
  //phoneNumber: <Space />,
  //emailAddress: <MessageFilled />,
  github: <GithubFilled />,
  twitter: <TwitterCircleFilled />,
  behance: <BehanceCircleFilled />,
  dribbble: <DribbbleCircleFilled />,
  linkedin: <LinkedinFilled />,
  facebook: <FacebookFilled />,
  instagram: <InstagramFilled />,
};

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState({});
  //const [fetchError, setFetchError] = useState(false);

  async function fetchSocialLinks(): Promise<void> {
    //TODO: update with route once implemented on backend
    //const res = await fetch ('/api/v/1/...')
    //res
    //  .json()
    //  .then(res => setSocialLinks(res.data))
    //  .catch(err => setFetchError(err));

    // Dummy for now
    setSocialLinks({
      //"phoneNumber": '0492837116',
      //"emailAddress": 'mailto:email@example.com',
      github: 'https://www.github.com',
      twitter: 'https://www.twitter.com',
      behance: 'https://www.behance.com',
      dribbble: 'https://www.dribbble.com',
      linkedin: 'https://www.linkedin.com',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
    });
  }

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  //if (fetchError) {
  //    return null;
  //}

  return (
    <div className="socialLinks">
      {Object.entries(socialLinks).map(
        ([socialType, socialLink]: [string, any]) => {
          return (
            <>
              <a target="_blank" rel="noopener noreferrer" href={socialLink}>
                {SOCIAL_LINK_ICON[socialType]} <Space />
              </a>
            </>
          );
        }
      )}
    </div>
  );
}

export default SocialLinks;
