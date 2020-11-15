import React from 'react';
import { Result } from 'antd';

import './ProfileSignupCTA.css';
import LoginButton from './LoginButton';

function ProfileSignupCTA() {
  return (
    <div className="profile-signup-cta">
      <Result
        status="info"
        title="Sign up or login to create a profile"
        extra={<LoginButton />}
      />
    </div>
  );
}

export default ProfileSignupCTA;
