import React, { useState } from 'react';

import { Spin, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';
import ResumeEntry from './ResumeEntry';
import TextInput from './TextInput';
import { useEffect } from 'react';
import { Large } from '../stories/Button.stories';

type ResumeProps = {
  userID: string;
};

type ResumeData = {
  email: string;
  name: string;
  gender: string;
  userRole: string;
  workStatus: string;
  headline: string;
  bio: string;
  location: string;
  profilePicture?: string;
  heroPicture?: string;
};

function Resume(props: ResumeProps) {
  const isMyProfile = true;

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<ResumeData>();

  async function fetchData(): Promise<void> {
    setData({
      email: 'string',
      name: 'Jane Doe',
      gender: 'string',
      userRole: 'string',
      workStatus: 'string',
      headline: 'string',
      bio:
        'I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design.',
      location: 'string',
      profilePicture: 'string',
      heroPicture: 'string',
    });
    setIsLoading(false);
  }

  async function saveData(): Promise<void> {}

  useEffect(() => {
    fetchData();
  }, []);

  // const studentbadges = () => {
  //   if (props.student !== '') {
  //     return (
  //       <Tooltip title={props.student} placement="bottom">
  //         <li>
  //           <Emoji symbol="🧑‍🎓" label="Student" />
  //         </li>
  //       </Tooltip>
  //     );
  //   } else {
  //     return;
  //   }
  // };

  // const workbadges = () => {
  //   if (props.work) {
  //     return (
  //       <Tooltip title="Open to work opportunities" placement="bottom">
  //         <li>
  //           <Emoji symbol="✅" label="Open to work opportunities" />
  //         </li>
  //       </Tooltip>
  //     );
  //   } else {
  //     return;
  //   }
  // };

  // const locationbadges = () => {
  //   if (props.location !== '') {
  //     return (
  //       <Tooltip title={props.location} placement="bottom">
  //         <li>
  //           <Emoji symbol="🌏" label="Location" />
  //         </li>
  //       </Tooltip>
  //     );
  //   } else {
  //     return;
  //   }
  // };
  if (isLoading) {
    return (
      <div className="container-primary resume container-scroll">
        <Spin size={'large'} />
      </div>
    );
  } else {
    return (
      <div className="container-primary resume container-scroll">
        <div className="container-secondary resume-hero"></div>
        <div className="container-secondary resume-picture">
          <UserOutlined style={{ fontSize: '64px', color: '#fff' }} />
        </div>
        <div className="resume-name">
          <h1>
            <strong>
              <TextInput
                editable={isMyProfile}
                onChange={(newString: string) => {
                  if (data) {
                    data.name = newString;
                  }
                  saveData();
                }}
                text={data?.name}
              />
            </strong>
          </h1>

          <div className="resume-badges">
            <ul>
              {/* {studentbadges()}
            {workbadges()}
            {locationbadges()} */}
            </ul>
          </div>
        </div>
        <div className="resume-profile">
          <TextInput
            padding="10px"
            multiline={true}
            editable={isMyProfile}
            onChange={(newString: string) => {
              if (data) {
                data.bio = newString;
              }
              saveData();
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
