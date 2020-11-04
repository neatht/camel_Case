import React, { useState } from 'react';

import { Popover, Spin, Switch, Tooltip } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';
import ResumeEntry from './ResumeEntry';
import TextInput from './TextInput';
import { useEffect } from 'react';
import SocialLinks from './SocialLinks';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import UploaderImage from './UploaderImage';

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
  const { getAccessTokenSilently } = useAuth0();
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
      const token = await getAccessTokenSilently();
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
      // TODO: Could add warning?
      console.log('setting data...', { data });
      setProfileData(data);
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
      //return res;
    }
    // GET data
    /*setData({
      firstName: 'Jane',
      lastName: 'Doe',
      gender: 'string',
      lookingForWork: true,
      bio:
        'I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design.',
      location: 'Melbourne, Australia ',
      publicLocation: false,
      //student: true,
      //institution: 'The University of Melbourne',
      public: true,
      //DOB: '',
      //heroPicture: 'https://i.ibb.co/BNZxQ2z/example0.jpg',
      //profilePicture: 'https://i.ibb.co/BNZxQ2z/example0.jpg',
    });*/
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
        //return res;
      }
    }
    if (updateProfileData !== profileData) {
      console.log('updating profile');
      saveData();
    }
  }, [updateProfileData]);

  useEffect(() => {
    console.log('initial fetch from resume');
    fetchData();
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
            onUpload={(file: any, type: string, mediaCategory: string) => {
              //setHeroPicture(file);
              //EDIT
            }}
          />
        ) : (
          <></>
        )}
        <div
          style={
            heroPicture
              ? { backgroundImage: `url(${profileData?.heroPicture})` }
              : {}
          }
          className="container-secondary resume-hero"
        ></div>

        <div
          style={
            profilePicture
              ? {
                  backgroundImage: `url(${profileData?.profilePicture})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }
              : {}
          }
          className="container-secondary resume-picture"
        >
          {isMyProfile ? (
            <UploaderImage
              onUpload={(file: any, type: string, mediaCategory: string) => {
                //setProfilePicture();
                //EDIT
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
              {/* No student info in route currently...
                isMyProfile ? (
                <Popover
                  content={
                    <div>
                      <h3>
                        <strong>
                          <TextInput
                            editable={isMyProfile}
                            onChange={(newString: string) => {
                              if (data) {
                                //const newData = { ...data };
                                const newData = {} as ResumeData;
                                newData.institution = newString;
                                setUpdatProfileData(newData);
                                //saveData();
                              }
                            }}
                            text={data?.institution}
                            placeholder={}
                          />
                        </strong>
                      </h3>
                      I am a student
                      <div style={{ paddingLeft: '10px', float: 'right' }}>
                        {' '}
                        <Switch
                          defaultChecked={data?.student}
                          onChange={() => {
                            if (data) {
                              // UPDATE
                              //const newData = { ...data };
                              //newData.student = !data?.student;
                              //setData(newData);
                              //saveData();
                            }
                          }}
                        />
                      </div>
                    </div>
                  }
                  title="Where are you studying?"
                  trigger="click"
                >
                  <li style={data?.student ? {} : { opacity: '0.5' }}>
                    <Emoji symbol="🧑‍🎓" label="Location" />
                  </li>
                </Popover>
              ) : data?.student ? (
                <Tooltip title={data?.institution} placement="bottom">
                  <li>
                    <Emoji symbol="🧑‍🎓" label="Location" />
                  </li>
                </Tooltip>
              ) : (
                <></>
              )*/}
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
        <ResumeEntry type="Skills" display="inline" isMyProfile={isMyProfile} />
        <ResumeEntry
          type="Experience"
          display="block"
          isMyProfile={isMyProfile}
        />

        <ResumeEntry
          type="Achievements"
          display="inline"
          isMyProfile={isMyProfile}
        />

        <ResumeEntry
          type="Education"
          display="block"
          isMyProfile={isMyProfile}
        />

        {/* </div> */}
      </div>
    );
  }
}

export default Resume;
