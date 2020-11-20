import React, { useEffect } from 'react';
import { useState } from 'react';

import './PortfolioHero.css';
import placeholderFolioImage from '../placeholder-folio-image.png';

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://localhost:5000/api/';

type PortfolioHeroProps = {
  isOpen: boolean;
  isMyProfile: boolean;
  projectID?: string;
  userID?: string;
  new: boolean;
};

type PortfolioHeroData = {
  datePosted: string;
  link: string;
  mediaName: string;
  projectID: string;
  mediaType: string;
  userID: string;
};

function PortfolioHeroSearch(props: PortfolioHeroProps) {
  const [slide, setSlide] = useState(0);

  const [media, setMedia] = useState<PortfolioHeroData[]>();

  async function fetchData(): Promise<void> {
    console.log('fetching media');
    // If there is no userID, fetch own profile
    const route = `project/media/${props.userID}/${props.projectID}`;
    console.log({ route });
    try {
      const res = await fetch(API_URL + route);

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has profile data
      const resBody = await res.json();
      const data = 'data' in resBody ? resBody['data'] : {};

      console.log('setting media...', { data });

      setMedia(data);
    } catch (e) {
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [props.projectID]);

  if (props.isOpen) {
    return (
      <div
        className={`portfolio-hero  ${
          '' + (!media || media?.length === 0 ? ' container-media ' : '')
        }`}
      >
        {media && media.length > 1 ? (
          <>
            <div
              className="portfolio-hero-button display-left container-secondary"
              onClick={() => {
                if (media) {
                  slide > 0 ? setSlide(slide - 1) : setSlide(media.length - 1);
                }
              }}
            >
              &#8249;
            </div>
            <div
              className="portfolio-hero-button display-right container-secondary"
              onClick={() => {
                if (media) {
                  slide < media.length - 1 ? setSlide(slide + 1) : setSlide(0);
                }
              }}
            >
              &#8250;
            </div>
          </>
        ) : (
          <></>
        )}
        <div style={{ height: '100%', display: 'flex' }}>
          {media && media.length > 0 ? (
            media.map((value, index) => {
              if (value.mediaType === 'image') {
                return (
                  <div
                    className={`portfolio-hero-media container-secondary ${
                      slide === index ? 'portfolio-hero-media-max' : ''
                    }`}
                    style={{ backgroundImage: `url(${value.link})` }}
                  ></div>
                );
              } else if (value.mediaType === 'video') {
                return (
                  <div
                    className={`portfolio-hero-media container-secondary ${
                      slide === index ? 'portfolio-hero-media-max' : ''
                    }`}
                  >
                    <video width="100%" height="100%" controls>
                      <source src={`${value.link}`} />
                    </video>
                  </div>
                );
              } else {
                return (
                  <div
                    className={`portfolio-hero-media container-secondary ${
                      slide === index ? 'portfolio-hero-media-max' : ''
                    }`}
                  >
                    <embed src={`${value.link}`} width="100%" height="100%" />
                  </div>
                );
              }
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`portfolio-hero`}
        style={{
          backgroundImage: `url(${
            media && media.length > 0 && media[0].mediaType === 'image'
              ? media[0].link
              : placeholderFolioImage
          })`,
        }}
      ></div>
    );
  }
}

export default PortfolioHeroSearch;
