import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { Button } from 'antd';

import './LoginButton.css';

function LoginButton() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </Button>
      ) : (
        <Button type="primary" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      )}
    </div>
  );
}

export default LoginButton;
