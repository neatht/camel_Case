import React from 'react';
import { useState } from 'react';

import SocialLinks from './SocialLinks';

import './PortfolioObject.css';
import Emoji from './Emoji';
import AuthorBadge from './AuthorBadge';

type PortfolioObjectProps = {
  id: string;
  title: string;
  type: string;
  media: string;
  date: string;
  author: string;
  shortDescription: string;
  views: string;
  location: string;
  picture: string;
  portfolioObjectOpen: any;
};

function PortfolioObject(props: PortfolioObjectProps) {
  const [thumbnail, setThumbnail] = useState(true);

  const handleClick = () => {
    setThumbnail(!thumbnail);
    props.portfolioObjectOpen(thumbnail);
  };

  return (
    <div
      className={`container-primary portfolio-object ${
        thumbnail ? 'thumbnail' : 'container-scroll'
      }`}
    >
      <div onClick={handleClick} className="exit-button"></div>
      <div className="portfolio-title">
        <h2>{props.title}</h2>
      </div>
      <div
        className="container-secondary portfolio-hero"
        style={{ backgroundImage: `url(${props.picture})` }}
      ></div>
      <div className="portfolio-object-overlay">
        <div className="portfolio-meta">
          <h4>
            <strong>{props.title}</strong>
          </h4>
          <h5>{props.author}</h5>
        </div>
      </div>
      <div className="portfolio-object-body">
        <div className="container-secondary portfolio-side-bar">
          <ul>
            <li>
              <Emoji symbol="💻" label="Type:" /> {props.type}
            </li>
            <li>
              <Emoji symbol="📅" label="Date:" /> {props.date}
            </li>
            <li>
              <Emoji symbol="🌏" label="Location:" /> {props.location}
            </li>
            <li>
              <Emoji symbol="🔗" label="Link:" />{' '}
              <a href={props.media}>{props.media}</a>
            </li>
            <li>
              <Emoji symbol="👁️" label="Views:" /> {props.views}
            </li>
          </ul>
          <div style={{ textAlign: 'center' }}>
            <SocialLinks />
          </div>
        </div>
        <AuthorBadge author={props.author} tagline="Author Tagline" />
        <br />
        {props.shortDescription} <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nisi
        tellus, gravida in cursus et, ultrices eu libero. Nullam mollis ac nibh
        at rutrum. Donec auctor orci odio. In non mi vel tellus faucibus blandit
        pretium ac ante. Curabitur laoreet mauris eget justo tristique, finibus
        ornare ex dapibus. Nunc scelerisque risus sed odio convallis
        ullamcorper. Aenean bibendum molestie nisi in fermentum. Cras tempor,
        elit in congue maximus, orci nulla vehicula purus, id aliquet augue
        neque quis augue. Vestibulum vitae purus sit amet diam venenatis
        pulvinar non quis mauris.
      </div>
    </div>
  );
}

export default PortfolioObject;
