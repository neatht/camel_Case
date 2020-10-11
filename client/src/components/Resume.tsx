import React, { useState } from 'react';

import { Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';
import ResumeEntry from './ResumeEntry';
import Paragraph from 'antd/lib/typography/Paragraph';

type ResumeProps = {
  name: string;
  profile: string;
  student: string;
  location: string;
  work: boolean;
};

function Resume(props: ResumeProps) {
  const isMyProfile = true;

  const [name, setName] = useState(props.name);
  const [profile, setProfile] = useState(props.profile);

  const studentbadges = () => {
    if (props.student !== '') {
      return (
        <Tooltip title={props.student} placement="bottom">
          <li>
            <Emoji symbol="🧑‍🎓" label="Student" />
          </li>
        </Tooltip>
      );
    } else {
      return;
    }
  };

  const workbadges = () => {
    if (props.work) {
      return (
        <Tooltip title="Open to work opportunities" placement="bottom">
          <li>
            <Emoji symbol="✅" label="Open to work opportunities" />
          </li>
        </Tooltip>
      );
    } else {
      return;
    }
  };

  const locationbadges = () => {
    if (props.location !== '') {
      return (
        <Tooltip title={props.location} placement="bottom">
          <li>
            <Emoji symbol="🌏" label="Location" />
          </li>
        </Tooltip>
      );
    } else {
      return;
    }
  };

  return (
    <div className="container-primary resume container-scroll">
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      {/* <Tooltip title="Hide" placement="bottom">
                    <div className="exit-button" onClick={() => setIsOpen(!isOpen)}></div>
                </Tooltip> */}

      <div className="container-secondary resume-hero"></div>
      <div className="container-secondary resume-picture">
        <UserOutlined style={{ fontSize: '64px', color: '#fff' }} />
      </div>
      <div className="resume-name">
        <h1>
          <strong>
            <Paragraph
              editable={
                isMyProfile
                  ? {
                      onChange: (newString: string) => {
                        setName(newString);
                        //POST UPDATE
                      },
                    }
                  : false
              }
            >
              {name}
            </Paragraph>
          </strong>
        </h1>

        <div className="resume-badges">
          <ul>
            {studentbadges()}
            {workbadges()}
            {locationbadges()}
          </ul>
        </div>
      </div>
      <div className="resume-profile">
        <Paragraph
          editable={
            isMyProfile
              ? {
                  onChange: (newString: string) => {
                    setProfile(newString);
                    //POST UPDATE
                  },
                }
              : false
          }
        >
          {profile}
        </Paragraph>
      </div>
      <ResumeEntry
        title="Skills"
        display="inline"
        isMyProfile={isMyProfile}
        entries={[
          { text: 'HTML' },
          { text: 'CSS' },
          { text: 'JavaScript' },
          { text: 'React.js' },
          { text: 'Python' },
          { text: 'C' },
          { text: 'Java' },
          { text: 'Graphic Design' },
          { text: 'Photoshop' },
          { text: 'Illustrator' },
        ]}
      />
      <ResumeEntry
        title="Experience"
        display="block"
        isMyProfile={isMyProfile}
        entries={[
          {
            date: '2020',
            text: 'Internship at a Company',
            subText: 'as a Full Stack Developer',
          },
          {
            date: '2019',
            text: 'Internship at a different Company',
            subText: 'as a Front end Developer',
          },
          { date: '2018-Current', text: 'Part time job' },
        ]}
      />

      <ResumeEntry
        title="Achievements"
        display="inline"
        isMyProfile={isMyProfile}
        entries={[
          { date: '2020', text: 'First Cass Honours' },
          { date: '2020', text: 'First in Hackathon' },
        ]}
      />

      <ResumeEntry
        title="Education"
        display="block"
        isMyProfile={isMyProfile}
        entries={[
          {
            date: '2018-20',
            text: 'The University of Melbourne',
            subText:
              'Bachelor of Science - Major in computing and software systems',
          },
          {
            date: '2017',
            text: 'School College',
            subText: 'Completed International Baccalaureate Diploma',
          },
        ]}
      />

      {/* </div> */}
    </div>
  );
}

export default Resume;
