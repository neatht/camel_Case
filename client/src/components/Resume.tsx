import React, { useState } from 'react';

import { Popover, Spin, Switch, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';
import ResumeEntry from './ResumeEntry';
import TextInput from './TextInput';
import { useEffect } from 'react';
import { Large } from '../stories/Button.stories';
import SocialLinks from './SocialLinks';

// needs to have all props bar userID removed.
type ResumeProps = {
  userID?: string;
  name?: string;
  profile?: string;
  student?: string;
  location?: string;
  work?: boolean;
};

type ResumeData = {
  name: string;
  bio: string;
  location: string;
  showLocation: boolean;
  lookingForWork: boolean;
  student: boolean;
  institution: string;
  public: boolean;
  gender: string;
  DOB: string;
  profilePicture?: string;
  heroPicture?: string;
};

function Resume(props: ResumeProps) {
  // EDIT ME
  const isMyProfile = true;

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<ResumeData>();

  // EDIT ME
  async function fetchData(): Promise<void> {
    // GET data
    setData({
      name: 'Jane Doe',
      gender: 'string',
      lookingForWork: true,
      bio:
        'I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design.',
      location: 'Melbourne, Australia ',
      showLocation: false,
      student: true,
      institution: 'The University of Melbourne',
      public: true,
      DOB: '',
      // heroPicture: 'https://i.ibb.co/BNZxQ2z/example0.jpg',
      // profilePicture: 'https://i.ibb.co/BNZxQ2z/example0.jpg',
    });
    setIsLoading(false);
  }

  // EDIT ME
  async function saveData(): Promise<void> {
    // PUT data
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container-primary resume container-scroll">
        <Spin size={'large'} />
      </div>
    );
  } else {
    return (
      <div className="container-primary resume container-scroll">
        <div
          style={
            data?.heroPicture
              ? { backgroundImage: `url(${data?.heroPicture})` }
              : {}
          }
          className="container-secondary resume-hero"
        ></div>
        <div
          style={
            data?.profilePicture
              ? { backgroundImage: `url(${data?.profilePicture})` }
              : {}
          }
          className="container-secondary resume-picture"
        >
          {data?.profilePicture ? (
            <></>
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
                  if (data) {
                    const newData = { ...data };
                    newData.name = newString;
                    setData(newData);
                    saveData();
                  }
                }}
                text={data?.name}
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
                          defaultChecked={data?.lookingForWork}
                          onChange={() => {
                            if (data) {
                              const newData = { ...data };
                              newData.lookingForWork = !data?.lookingForWork;
                              setData(newData);
                              saveData();
                            }
                          }}
                        />
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <li style={data?.lookingForWork ? {} : { opacity: '0.5' }}>
                    <Emoji symbol="✅" label="Open to work opportunities" />
                  </li>
                </Popover>
              ) : data?.lookingForWork ? (
                <Tooltip title="Open to work opportunities" placement="bottom">
                  <li>
                    <Emoji symbol="✅" label="Open to work opportunities" />
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
                              if (data) {
                                const newData = { ...data };
                                newData.location = newString;
                                setData(newData);
                                saveData();
                              }
                            }}
                            text={data?.location}
                          />
                        </strong>
                      </h3>
                      Show my location
                      <div style={{ paddingLeft: '10px', float: 'right' }}>
                        {' '}
                        <Switch
                          defaultChecked={data?.showLocation}
                          onChange={() => {
                            if (data) {
                              const newData = { ...data };
                              newData.showLocation = !data?.showLocation;
                              setData(newData);
                              saveData();
                            }
                          }}
                        />
                      </div>
                    </div>
                  }
                  title="Where are you located?"
                  trigger="click"
                >
                  <li style={data?.showLocation ? {} : { opacity: '0.5' }}>
                    <Emoji symbol="🌏" label="Location" />
                  </li>
                </Popover>
              ) : data?.showLocation ? (
                <Tooltip title={data?.location} placement="bottom">
                  <li>
                    <Emoji symbol="🌏" label="Location" />
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
                              if (data) {
                                const newData = { ...data };
                                newData.institution = newString;
                                setData(newData);
                                saveData();
                              }
                            }}
                            text={data?.institution}
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
                              const newData = { ...data };
                              newData.student = !data?.student;
                              setData(newData);
                              saveData();
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
              if (data) {
                const newData = { ...data };
                newData.bio = newString;
                setData(newData);
                saveData();
              }
            }}
            text={data?.bio}
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
