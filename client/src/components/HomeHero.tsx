import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Button, Tooltip } from 'antd';

import Emoji from './Emoji';

import './HomeHero.css';

function HomeHero() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen ? (
        <div className="home-hero">
          <Tooltip title="Hide" placement="bottom">
            <div
              className="toggle-home-hero exit-button"
              onClick={() => setIsOpen(!isOpen)}
            ></div>
          </Tooltip>

          <div
            className="home-CTA"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 250,
              padding: '30px',
            }}
          >
            <h1 style={{ fontSize: '3.5em' }} className="gradient">
              <strong>Glowbal</strong>
            </h1>

            {!isAuthenticated ? (
              <>
                {/* <p> Showcase your best work by creating a profile and...</p> */}
                <Button type="primary" onClick={() => loginWithRedirect()}>
                  {' '}
                  <span className="rocket">
                    <Emoji symbol="🚀" resize={false} />
                  </span>{' '}
                  <strong className="rocket">Get Discovered</strong>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default HomeHero;
