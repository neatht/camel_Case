import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

import './ProfileSetup.css';

import Header from '../components/Header';

import Emoji from '../components/Emoji';
import ProfileSetupForm from '../components/ProfileSetupForm';
import Loading from '../components/Loading';
import Resume from '../components/Resume';
import PortfolioGrid from '../components/PortfolioGrid';

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://localhost:5000/api/';

type ParamType = {
  userID: string;
};

function ProfileSetup() {
  const [profileInfo, setProfileInfo] = useState({});
  const [isPostingProfile, setIsPostingProfile] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const { userID } = useParams<ParamType>();

  console.log({ userID });

  /**
   * Used to create a profile through the API
   *
   * @param profileData The profile data to be posted
   * @param callback Callback function with the profile data as argument when successful, and {} when unsuccessful. Can be used to setState
   * @param setIsLoading Callback function to toggle when awaiting response
   * @param route Specified route to call API at in form '/api/{route}'
   *
   * @returns res The response of the call
   */
  async function postProfile(
    profileData: Object,
    callback: (data: Object) => void,
    setIsLoading?: (isLoading: boolean) => void,
    route?: string
  ) {
    if (setIsLoading) {
      setIsLoading(true);
    }

    if (!route) {
      route = 'profile';
    }

    try {
      const token = await getAccessTokenSilently();
      await fetch(API_URL + route, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: profileData }),
      })
        .then((response) => response.json())
        .then((res: Object) => {
          if ('status' in res && res['status'] === 'success') {
            callback(profileData);
          } else {
            callback({});
          }
          if (setIsLoading) {
            setIsLoading(false);
          }
          return res;
        });
    } catch (e) {
      const res = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      callback({});
      if (setIsLoading) {
        setIsLoading(false);
      }
      console.error(e);
      return res;
    }
  }

  /**
   * Used to get a profile from the API
   *
   * @param {data: Object => void} callback Callback function with the profile data as argument when successful, and {} when unsuccessful. Can be used to setState
   * @param {isLoading: boolean => void} setIsLoading Callback function to toggle when awaiting response
   * @param {string} route Specified route to call API at in form '/api/{route}' Default is 'profile/getOwnProfile'
   *
   * @returns res The response of the call
   */
  async function getProfile(
    callback: (data: Object) => void,
    setIsLoading?: (isLoading: boolean) => void,
    route?: string
  ) {
    if (setIsLoading) {
      setIsLoading(true);
    }

    if (!route) {
      route = 'profile/getOwnProfile';
    }

    try {
      const token = await getAccessTokenSilently();
      await fetch(API_URL + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((res: Object) => {
          if (setIsLoading) {
            setIsLoading(false);
          }
          if ('data' in res) {
            callback(res['data']);
          } else {
            callback({});
          }
          return res;
        });
    } catch (e) {
      if (setIsLoading) {
        setIsLoading(false);
      }
      const res = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      callback({});
      console.error(e);
      return res;
    }
  }

  useEffect(() => {
    const setFirstProfileInfo = (profileInfo: Object) => {
      setProfileInfo(profileInfo);
      setHasFetchedOnce(true);
    };

    getProfile(setFirstProfileInfo);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header pageKey="profile" />

      <div className="grid-main-layout-primary">
        {!hasFetchedOnce ? (
          <Loading messages={['Loading Profile']} />
        ) : (
          <>
            {/* ***** Actual Content Here ****** */}

            {'firstName' in profileInfo && 'lastName' in profileInfo ? (
              <>
                <Resume userID={userID} />
                <PortfolioGrid />
              </>
            ) : null}

            <Modal
              title={
                <>
                  <Emoji symbol="👋" />
                  <strong> Profile Setup </strong>
                </>
              }
              closable={false}
              visible={
                hasFetchedOnce &&
                Object.keys(profileInfo).length === 0 &&
                !userID
              }
              footer={null}
            >
              <ProfileSetupForm
                onFinish={(result) => {
                  postProfile(result, setProfileInfo, setIsPostingProfile);
                }}
                submitLabel="Save"
                isLoading={isPostingProfile}
              />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileSetup;
