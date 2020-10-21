import { Spin, Tooltip } from 'antd';
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

  // EDIT ME
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
          {
            date: '2018-Current',
            text: 'Part time job',
            subText: 'doing something',
          },
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

  // EDIT ME
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
                  <Tooltip title="Remove" placement="top">
                    <div
                      className="exit-button exit-button-resume-entry"
                      onClick={() => {
                        const newData = { ...data };
                        newData.entries.splice(index, 1);
                        setData(newData);
                        saveData();
                      }}
                    ></div>
                  </Tooltip>
                  <div>
                    <TextInput
                      editable={props.isMyProfile}
                      onChange={(newString: string) => {
                        const newData = { ...data };
                        newData.entries[index].text = newString;
                        setData(newData);
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
                  <Tooltip title="Remove" placement="top">
                    <div
                      className="exit-button exit-button-resume-entry"
                      onClick={() => {
                        const newData = { ...data };
                        newData.entries.splice(index, 1);
                        setData(newData);
                        saveData();
                      }}
                    ></div>
                  </Tooltip>
                  <div className="resume-entry-grid">
                    <div className="resume-entry-date">
                      <TextInput
                        editable={props.isMyProfile}
                        onChange={(newString: string) => {
                          const newData = { ...data };
                          newData.entries[index].date = newString;
                          setData(newData);
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
                          const newData = { ...data };
                          newData.entries[index].text = newString;
                          setData(newData);
                          saveData();
                        }}
                        padding="2px"
                        text={value.text}
                      />

                      <div className="resume-sub-text">
                        <TextInput
                          editable={props.isMyProfile}
                          onChange={(newString: string) => {
                            const newData = { ...data };
                            newData.entries[index].subText = newString;
                            setData(newData);
                            saveData();
                          }}
                          padding="2px"
                          text={value.subText}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
        <Tooltip
          title={'Add ' + props.type.replace(/[sS]$/, '')}
          placement="bottom"
        >
          <div
            className="resume-entry-add "
            onClick={() => {
              if (data) {
                const newData = { ...data };
                newData.entries.push({
                  date: 'date',
                  text: props.type.replace(/[sS]$/, ''),
                  subText: 'More Info',
                });
                setData(newData);
                saveData();
              }
            }}
          >
            +
          </div>
        </Tooltip>
      </div>
    );
  }
}

export default ResumeEntry;
