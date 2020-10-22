import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import PortfolioGrid from '../components/PortfolioGrid';
import Resume from '../components/Resume';

// import useCheckAccessToken from '../hooks/checkAccessToken';

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  //const checkAccessToken = useCheckAccessToken();


  // EDIT ME
  const isMyProfile = true;

  return (
    <div className="App">
      <Header pageKey="profile" />

      <div className="grid-main-layout-primary">
        <Resume
          isMyProfile={isMyProfile}
          userID="s"
          // name="Jane Doe"
          // profile="I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design. "
          // student="The University of Melbourne"
          // location="Melbourne, Australia"
          // work={true}
        />
        <PortfolioGrid isMyProfile={isMyProfile} />
      </div>

      {/* {isAuthenticated ? (
        <div>
          <h2> User: {user.name} </h2>
          <p> Email: {user.email} </p>
        </div>
      ) : (
        <div>
          <h2> Not logged in </h2>
        </div>
      )}

      <SocialLinks /> */}
    </div>
  );
}

export default Profile;
