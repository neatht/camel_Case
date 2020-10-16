import { Spin } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import './ResumeEntry.css';
import TextInput from './TextInput';

type ResumeEntryProps = {
  type: string;
  display: string;
  isMyProfile: boolean;
};

type ResumeEntryData = {
  entries: { date?: string; text: string; subText?: string }[];
};

function ResumeEntry(props: ResumeEntryProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<ResumeEntryData>();

  async function fetchData(): Promise<void> {
    if (props.type === 'Skills') {
      setData({
        entries: [
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
        ],
      });
    } else if (props.type === 'Experience') {
      setData({
        entries: [
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
        ],
      });
    } else if (props.type === 'Achievements') {
      setData({
        entries: [
          { date: '2020', text: 'First Cass Honours' },
          { date: '2020', text: 'First in Hackathon' },
        ],
      });
    } else if (props.type === 'Education') {
      setData({
        entries: [
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
        ],
      });
    } else {
      console.log(TypeError('There is no Resume Entry type of ' + props.type));
    }
    setIsLoading(false);
  }

  async function saveData(): Promise<void> {}

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div className="resume-entry">
        <Spin size={'large'} />
      </div>
    );
  } else {
    return (
      <div
        className={`resume-entry ${
          props.display === 'inline'
            ? 'resume-entry-inline'
            : 'resume-entry-block'
        }`}
      >
        <h2>
          <strong>{props.type}</strong>
        </h2>
        <ul>
          {data?.entries.map((value, index) => {
            if (props.display === 'inline') {
              return (
                <li key={index}>
                  <div>
                    <TextInput
                      editable={props.isMyProfile}
                      onChange={(newString: string) => {
                        if (data) {
                          data.entries[index].text = newString;
                        }
                        saveData();
                      }}
                      padding="5px"
                      radius="50px"
                      text={value.text}
                    />
                  </div>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <div className="resume-entry-date">
                    <TextInput
                      editable={props.isMyProfile}
                      onChange={(newString: string) => {
                        if (data) {
                          data.entries[index].date = newString;
                        }
                        saveData();
                      }}
                      padding="2px"
                      text={value.date}
                    />
                  </div>
                  <div>
                    <TextInput
                      editable={props.isMyProfile}
                      onChange={(newString: string) => {
                        if (data) {
                          data.entries[index].text = newString;
                        }
                        saveData();
                      }}
                      padding="2px"
                      text={value.text}
                    />

                    <div className="resume-sub-text">
                      <TextInput
                        editable={props.isMyProfile}
                        onChange={(newString: string) => {
                          if (data) {
                            data.entries[index].subText = newString;
                          }
                          saveData();
                        }}
                        padding="2px"
                        text={value.subText}
                      />
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default ResumeEntry;
