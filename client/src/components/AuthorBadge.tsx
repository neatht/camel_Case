import React from 'react';

import './AuthorBadge.css';

import { UserOutlined } from '@ant-design/icons';

type PortfolioObjectProps = {
  /** Author's name to be included */
  author: string;
  /** Tagline about the author to be included under the name */
  tagline?: string;
  /** A link to a profile picture */
  profilePictureLink?: string;
};

function AuthorBadge(props: PortfolioObjectProps) {
  return (
    <div className="authorBadge">
      <div
        className="profilePicture"
        style={{
          backgroundImage: `${
            props.profilePictureLink
              ? `url(${props.profilePictureLink})`
              : undefined
          }`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {!props.profilePictureLink ? (
          <UserOutlined style={{ fontSize: '32px', color: '#fff' }} />
        ) : null}
      </div>
      <div className="authorName">
        <h4>
          <strong>{props.author}</strong>
        </h4>
        <h5>{props.tagline}</h5>
      </div>
    </div>
  );
}

export default AuthorBadge;
