import Paragraph from 'antd/lib/typography/Paragraph';
import React from 'react';

import './ResumeEntry.css';

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
              <Paragraph
              editable={
                true
                  ? {
                      onChange: (newString: string) => {
                        // setName(newString);
                        //POST UPDATE
                      },
                    }
                  : false
              }
            >
              {value.text}
            </Paragraph>
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
