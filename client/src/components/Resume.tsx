import React, { useState } from 'react';

import { Popover, Switch, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';
import ResumeEntry from './ResumeEntry';
import TextInput from './TextInput';
import { useEffect } from 'react';
import SocialLinks from './SocialLinks';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import UploaderImage from './UploaderImage';

import { uploadDisplayPhoto, getOwnDisplayPhoto } from '../api/displayPhoto';
import { uploadHeroImage, getOwnHeroImage } from '../api/heroImage';

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://localhost:5000/api/';

type ResumeProps = {
  /** UserID of resume to get. If left blank, the logged in user will be fetched */
  userID?: string;
};

type ResumeData = {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  publicLocation?: boolean;
  lookingForWork?: boolean;
  //student: boolean;
  //institution: string;
  public?: boolean;
  gender?: string;
  DOB?: string;
  profilePicture?: string;
  heroPicture?: string;
};

function Resume(props: ResumeProps) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const isMyProfile = !props.userID ? true : false;

  const [isLoading, setIsLoading] = useState(true);

  const [profileData, setProfileData] = useState<ResumeData>();
  const [updateProfileData, setUpdateProfileData] = useState<ResumeData>();

  const [profilePicture, setProfilePicture] = useState('');
  const [heroPicture, setHeroPicture] = useState('');

  /**
   * Fetches profile data and sets appropriately
   *
   */
  async function fetchData(): Promise<void> {
    setIsLoading(true);

    // If there is no userID, fetch own profile
    const route = isMyProfile
      ? 'profile/getOwnProfile'
      : `profile/${props.userID}`;

    // Call API
    try {
      const token = isAuthenticated ? await getAccessTokenSilently() : '';
      const res = await fetch(API_URL + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has profile data
      const resBody = await res.json();
      const data = 'data' in resBody ? resBody['data'] : {};

      // Set profile data (empty object if invalid)
      console.log('setting data...', { data });
      setProfileData(data);

      const displayRes: any = await getOwnDisplayPhoto(token, API_URL);
      const heroRes: any = await getOwnHeroImage(token, API_URL);
      setProfilePicture(displayRes['link']);
      setHeroPicture(heroRes['link']);
      setIsLoading(false);
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
      console.error(res, e);
    }
    setIsLoading(false);
  }

  // Update API when profile data change
  useEffect(() => {
    console.log('checking to update profile...');
    async function saveData(): Promise<void> {
      //setIsLoading(true);

      // If there is no userID, fetch own profile
      const route = 'profile';

      console.log('saving', { updateProfileData });

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL + route, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: updateProfileData }),
        });

        // Check response is okay
        if (!res.ok) {
          console.error('Invalid response code', res.status, res.statusText);
          return;
        }
        console.log('updated successfully?', res.ok, res.statusText);
        fetchData();
        setIsLoading(false);
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
        console.error(res, e);
      }
    }
    if (updateProfileData !== profileData) {
      console.log('updating profile');
      saveData();
    }
    // eslint-disable-next-line
  }, [updateProfileData]);

  useEffect(() => {
    console.log('initial fetch from resume');
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="container-primary resume container-scroll">
        <Loading messages={['Getting profile information']} />
      </div>
    );
  } else {
    return (
      <div className="container-primary resume container-scroll">
        {isMyProfile ? (
          <UploaderImage
            onUpload={async (
              file: any,
              type: string,
              mediaCategory: string
            ) => {
              const token = await getAccessTokenSilently();
              await uploadHeroImage(file, type, mediaCategory, token, API_URL);
              const res: any = await getOwnHeroImage(token, API_URL);
              setHeroPicture(res['link']);
            }}
          />
        ) : (
          <></>
        )}
        <div
          style={heroPicture ? { backgroundImage: `url(${heroPicture})` } : {}}
          className="container-secondary resume-hero"
        ></div>

        <div
          style={
            profilePicture
              ? {
                  backgroundImage: `url(${profilePicture})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }
              : {}
          }
          className="container-secondary resume-picture"
        >
          {isMyProfile ? (
            <UploaderImage
              onUpload={async (
                file: any,
                type: string,
                mediaCategory: string
              ) => {
                const token = await getAccessTokenSilently();
                await uploadDisplayPhoto(
                  file,
                  type,
                  mediaCategory,
                  token,
                  API_URL
                );
                const res: any = await getOwnDisplayPhoto(token, API_URL);
                setProfilePicture(res['link']);
              }}
            />
          ) : (
            <></>
          )}

          {profilePicture ? (
            <></>
          ) : isMyProfile ? (
            <UserOutlined
              style={{ fontSize: '64px', color: '#fff', marginTop: '-16px' }}
            />
          ) : (
            <UserOutlined style={{ fontSize: '64px', color: '#fff' }} />
          )}
        </div>
        <div className="resume-name">
          <h1>
            <strong>
              <TextInput
                editable={isMyProfile}
                onChange={(newString: string) => {
                  if (profileData) {
                    const newData = {} as ResumeData;
                    // Assume that name field is firstName + lastName split by space (not great)
                    newData.firstName = newString.split(' ')[0];
                    if (newString.split(' ').length > 1) {
                      newData.lastName = newString.split(' ')[1];
                    }
                    //console.log({ newData });
                    setUpdateProfileData(newData);
                    //saveData();
                  }
                }}
                text={`${profileData?.firstName} ${profileData?.lastName}`}
              />
            </strong>
          </h1>

          <div className="resume-badges">
            <ul>
              {isMyProfile ? (
                <Popover
                  content={
                    <div>
                      I am open to work opportunities
                      <div style={{ paddingLeft: '10px', float: 'right' }}>
                        <Switch
                          defaultChecked={profileData?.lookingForWork}
                          onChange={() => {
                            if (profileData) {
                              const newData = {} as ResumeData;
                              newData.lookingForWork = !profileData?.lookingForWork;
                              setUpdateProfileData(newData);
                              //saveData();
                            }
                          }}
                        />
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <li
                    style={
                      profileData?.lookingForWork ? {} : { opacity: '0.5' }
                    }
                  >
                    <Emoji
                      symbol="✅"
                      label="Open to work opportunities"
                      resize={true}
                    />
                  </li>
                </Popover>
              ) : profileData?.lookingForWork ? (
                <Tooltip title="Open to work opportunities" placement="bottom">
                  <li>
                    <Emoji
                      symbol="✅"
                      label="Open to work opportunities"
                      resize={true}
                    />
                  </li>
                </Tooltip>
              ) : (
                <></>
              )}

              {isMyProfile ? (
                <Popover
                  content={
                    <div>
                      <h3>
                        <strong>
                          <TextInput
                            editable={isMyProfile}
                            onChange={(newString: string) => {
                              if (profileData) {
                                //const newData = { ...data };
                                const newData = {} as ResumeData;
                                newData.location = newString;
                                setUpdateProfileData(newData);
                                //saveData();
                              }
                            }}
                            text={profileData?.location}
                            placeholder={isMyProfile ? 'Location' : undefined}
                          />
                        </strong>
                      </h3>
                      Show my location
                      <div style={{ paddingLeft: '10px', float: 'right' }}>
                        {' '}
                        <Switch
                          defaultChecked={profileData?.publicLocation}
                          onChange={() => {
                            if (profileData) {
                              //const newData = { ...data };
                              const newData = {} as ResumeData;
                              newData.publicLocation = !profileData?.publicLocation;
                              setUpdateProfileData(newData);
                              //saveData();
                            }
                          }}
                        />
                      </div>
                    </div>
                  }
                  title="Where are you located?"
                  trigger="click"
                >
                  <li
                    style={
                      profileData?.publicLocation ? {} : { opacity: '0.5' }
                    }
                  >
                    <Emoji symbol="🌏" label="Location" resize={true} />
                  </li>
                </Popover>
              ) : profileData?.publicLocation ? (
                <Tooltip title={profileData?.location} placement="bottom">
                  <li>
                    <Emoji symbol="🌏" label="Location" resize={true} />
                  </li>
                </Tooltip>
              ) : (
                <></>
              )}
            </ul>
            <SocialLinks isMyProfile={isMyProfile} userID={props.userID} />
          </div>
        </div>

        <div className="resume-profile">
          <TextInput
            padding="10px"
            multiline={true}
            editable={isMyProfile}
            onChange={(newString: string) => {
              if (profileData) {
                //const newData = { ...data };
                const newData = {} as ResumeData;
                newData.bio = newString;
                setUpdateProfileData(newData);
                //saveData();
              }
            }}
            text={profileData?.bio}
            placeholder={isMyProfile ? 'Enter a bio' : undefined}
          />
        </div>
        <ResumeEntry
          type="skills"
          display="inline"
          isMyProfile={isMyProfile}
          userID={props.userID}
        />
        <ResumeEntry
          type="experience"
          display="block"
          isMyProfile={isMyProfile}
          userID={props.userID}
        />

        <ResumeEntry
          type="achievements"
          display="inline"
          isMyProfile={isMyProfile}
          userID={props.userID}
        />

        <ResumeEntry
          type="education"
          display="block"
          isMyProfile={isMyProfile}
          userID={props.userID}
        />
      </div>
    );
  }
}

export default Resume;
