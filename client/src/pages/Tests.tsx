import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

function Tests() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Header pageKey="tests" />

      <h1>
        <strong> Testing Links </strong>
      </h1>

      <Space>
        <Link to="/api-test">
          <Button>API Testing </Button>
        </Link>

        <Link to="/profile-setup">
          <Button>Profile Setup </Button>
        </Link>
      </Space>
    </div>
  );
}

export default Tests;
