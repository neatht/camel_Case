import React from 'react';
import { useState } from 'react';

import SocialLinks from './SocialLinks';
import PortfolioHero from './PortfolioHero';

import './PortfolioObject.css';
import Emoji from './Emoji';
import AuthorBadge from './AuthorBadge';
// import { useAuth0 } from '@auth0/auth0-react';
import TextInput from './TextInput';

type PortfolioObjectProps = {
  id: string;
  title: string;
  type: string;
  media: { type: string; url: string }[];
  date: string;
  author: string;
  shortDescription: string;
  views: string;
  location: string;
  portfolioObjectOpen: any;
};

function PortfolioObject(props: PortfolioObjectProps) {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  const isMyProfile = true;

  const [shortDescription, setShortDescription] = useState(
    props.shortDescription
  );
  const [title, setTitle] = useState(props.title);

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
        <h2 style={{ marginRight: '35px' }}>
          <TextInput
            padding="2px 0 2px 35px"
            editable={isMyProfile}
            onChange={(newString: string) => {
              setTitle(newString);
              //POST UPDATE
            }}
            text={props.title}
          />
        </h2>
      </div>

      <PortfolioHero
        isOpen={!thumbnail}
        isMyProfile={isMyProfile}
        media={props.media}
      />
      <div className="portfolio-object-overlay">
        <div className="portfolio-meta">
          <h4>
            <strong>{title}</strong>
          </h4>
          <h5>{props.author}</h5>
        </div>
      </div>
      <div className="portfolio-object-body">
        <div>
          <AuthorBadge author={props.author} tagline="Author Tagline" />
          <br />
          <div style={{ marginLeft: '-10px', marginTop: '-10px' }}>
            <TextInput
              padding="10px"
              multiline={true}
              editable={isMyProfile}
              onChange={(newString: string) => {
                setShortDescription(newString);
                //POST UPDATE
              }}
              text={shortDescription}
            />
          </div>
        </div>
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
              <a href="{props.media}">props.media</a>
            </li>
            <li>
              <Emoji symbol="👁️" label="Views:" /> {props.views}
            </li>
          </ul>
          <div style={{ textAlign: 'center' }}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioObject;
