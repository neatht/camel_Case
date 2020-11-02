import { Spin, Tooltip } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CompanyAutoComplete from './CompanyAutoComplete';

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
          /*
          { text: 'HTML' },
          { text: 'CSS' },
          { text: 'JavaScript' },
          { text: 'React.js' },
          { text: 'Python' },
          { text: 'C' },
          { text: 'Java' },
          { text: 'Graphic Design' },
          { text: 'Photoshop' },
          { text: 'Illustrator' },*/
        ],
      });
    } else if (props.type === 'Experience') {
      setData({
        entries: [],
      });
    } else if (props.type === 'Achievements') {
      setData({
        entries: [],
      });
    } else if (props.type === 'Education') {
      setData({
        entries: [],
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
                  {props.isMyProfile ? (
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
                  ) : (
                    <></>
                  )}
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
                      placeholder={props.type.replace(/[sS]$/, '')}
                    />
                  </div>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  {props.isMyProfile ? (
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
                  ) : (
                    <></>
                  )}
                  <div className="resume-entry-grid">
                    <div className="resume-entry-date">
                      {/** Add picture here... */}
                      {value.subText ? (
                        <span>
                          <img
                            src={`//logo.clearbit.com/${value.subText}.com`}
                            style={{ width: 75, height: 75 }}
                          />
                        </span>
                      ) : undefined}
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
                        placeholder="Job Title"
                      />

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
                        placeholder="Date"
                      />

                      <div className="resume-sub-text">
                        <CompanyAutoComplete
                          placeholder="Organisation"
                          onSelect={(newString: string) => {
                            const newData = { ...data };
                            newData.entries[index].subText = newString;
                            setData(newData);
                            saveData();
                          }}
                        />
                        {/*<TextInput
                          editable={props.isMyProfile}
                          onChange={(newString: string) => {
                            const newData = { ...data };
                            newData.entries[index].subText = newString;
                            setData(newData);
                            saveData();
                          }}
                          padding="2px"
                          text={value.subText}
                        />*/}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
        {props.isMyProfile ? (
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
                    date: '',
                    text: '',
                    subText: '',
                  });
                  setData(newData);
                  saveData();
                }
              }}
            >
              +
            </div>
          </Tooltip>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default ResumeEntry;
