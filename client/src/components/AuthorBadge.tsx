import React from 'react';

import './AuthorBadge.css';

import { UserOutlined } from '@ant-design/icons';

type PortfolioObjectProps = {
  author: string;
  tagline: string;
};

function AuthorBadge(props: PortfolioObjectProps) {
  return (
    <div className="authorBadge">
      <div className="profilePicture">
        <UserOutlined style={{ fontSize: '32px', color: '#fff' }} />
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
