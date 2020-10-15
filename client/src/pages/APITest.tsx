import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Input, Select, Spin, Typography } from 'antd';

import Header from '../components/Header';
import Emoji from '../components/Emoji';

import useAccessToken from '../hooks/checkAccessToken';
import LoginButton from '../components/LoginButton';

const { Option } = Select;
const { Search } = Input;
const { Paragraph, Text } = Typography;

/**
 * Items before the API route input
 */
const selectBefore = (
  <>
    <Select defaultValue="GET" className="select-before">
      <Option value="GET">GET</Option>
    </Select>
    <span> https://localhost:5000/api/</span>
  </>
);

function APITest() {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [visibleToken, setVisibleToken] = useState('');
  const [APIResult, setAPIResult] = useState({});
  const [isAPILoading, setIsAPILoading] = useState(false);

  // Find the auth token to display
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    async function getAccessToken() {
      await getAccessTokenSilently().then((accessToken) => {
        console.log('setting token to ', accessToken);
        {
          setVisibleToken(accessToken);
        }
      });
    }
    getAccessToken();
  }, [isAuthenticated]);

  /**
   * Used to call the API with the authentication token passed in automatically
   *
   * @param route Route to call at https://localhost:5000/api/{route}
   * @param callback Callback function with the the response JSON as data
   */
  async function callAPI(route: string, callback: (data: Object) => void) {
    setIsAPILoading(true);

    try {
      const token = await getAccessTokenSilently();
      await fetch('/api/' + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data: Object) => {
          setIsAPILoading(false);
          callback(data);
          return data;
        });
    } catch (e) {
      setIsAPILoading(false);
      const data = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      callback(data);
      console.error(e);
      return data;
    }
  }

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="App">
      <Header pageKey="" />

      <h1>
        <Emoji symbol="🖥" /> API Testing
      </h1>

      {isAuthenticated ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2> Authenticated User Information </h2>
          <p> Name: {user.name} </p>
          <p> Email: {user.email} </p>
          <Paragraph copyable={{ text: visibleToken }}>
            Access Token: {visibleToken.slice(0, 10)}...
          </Paragraph>

          <h2> Test Custom Authenticated Route </h2>

          <div
            style={{ width: 600, display: 'flex', justifyContent: 'center' }}
          >
            <Search
              addonBefore={selectBefore} //"GET https://localhost:5000/api/"
              defaultValue="test"
              onSearch={(value) => callAPI(value, setAPIResult)}
            />
          </div>

          <br />

          <h3> Result: </h3>

          {isAPILoading ? (
            <p>
              <Spin />
            </p>
          ) : (
            <p>
              <Text code>{JSON.stringify(APIResult)}</Text>
            </p>
          )}
        </div>
      ) : (
        <div>
          <h2>
            <Emoji symbol="❌" /> Not logged in{' '}
          </h2>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default APITest;
