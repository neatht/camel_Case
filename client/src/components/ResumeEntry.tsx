import React from 'react';

import './ResumeEntry.css';
import TextInput from './TextInput';

type ResumeEntryProps = {
  title: string;
  display: string;
  isMyProfile: boolean;
  entries: { date?: string; text: string; subText?: string }[];
};

function ResumeEntry(props: ResumeEntryProps) {
  return (
    <div
      className={`resume-entry ${
        props.display === 'inline'
          ? 'resume-entry-inline'
          : 'resume-entry-block'
      }`}
    >
      <h2>
        <strong>{props.title}</strong>
      </h2>
      <ul>
        {props.entries.map((value, index, array) => {
          return (
            <li key={index}>
              <div className="resume-entry-date">{value.date}</div>
              <div>
                <TextInput text={value.text}/>
                
                <div className="resume-sub-text">{value.subText}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResumeEntry;
